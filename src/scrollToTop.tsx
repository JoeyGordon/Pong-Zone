import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withRouter, RouteComponentProps } from 'react-router-dom';

declare global {
    namespace NodeJS {
        interface Global { window: any }
    }
}

type Props = {
    location: object,
    children: object
};

class ScrollToTop extends React.Component<Props & RouteComponentProps<any>> {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            global.window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);