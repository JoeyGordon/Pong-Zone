export const mode = "development";
export const devtool = "inline-source-map";
export const entry = "./app.ts";
export const output = {
    filename: "bundle.js"
};
export const resolve = {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
};
export const module = {
    rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" }
    ]
};