import * as React from "react";
import { firebase, auth, db } from "./firebase";
import * as userActions from "./actions/user";
import * as loadingActions from "./actions/loading";
import User from "./models/user";
import * as utils from "./utils/utils";

export const withUserAuthedAndLoaded = (Component: React.ComponentType) => {
  type Props = {
    dispatch?: ({ }) => void;
    loading: boolean;
  }

  type State = {
    authUser: object;
    user: object;
  }

  return class WithUserAuthedAndLoaded extends React.Component<Props, State> {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
        user: null
      };
    }
    async createUserRecord(user: User) {
      // Persist the user
      return db.collection('users').doc(user.id).set(utils.createFirebaseGeneric(user))
        .catch(function (error) {
          console.error("Error adding user document: ", error);
        });
    }
    getUserRecordByEmail(authUser) {
      const fetchUserQuery = db.collection("users").where("email", "==", authUser.email);
      return fetchUserQuery.get().then(async response => {
        if (response.docs.length > 1) {
          throw new Error("More than one user returned for email");
        }
        if (response.empty) {
          const user = new User(authUser)
          await this.createUserRecord(user);
          return user;
        }
        return new User(response.docs[0].data());
      });
    }
    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(loadingActions.startLoading());
      auth.getRedirectResult()
        .then(async result => {
          if (result.credential && result.additionalUserInfo.isNewUser) {
            const user = new User(result.user)
            await this.createUserRecord(user);
            dispatch(userActions.setUser(user));
          }
        })
        .catch(function (error) {
          throw error;
        });
      firebase.auth().onAuthStateChanged(authUser => {
        if (authUser) {
          console.log("User is authed and signed in: ", authUser);
          // go fetch the user data from firebase and set the user
          this.getUserRecordByEmail(authUser).then(user => {
            dispatch(userActions.setUser(user));
          });
        } else {
          dispatch(userActions.logOutUser());
        }
      });
      dispatch(loadingActions.stopLoading());
    }
    render() {
      return (<Component {...this.props} />);
    }
  }
};
export default withUserAuthedAndLoaded;
