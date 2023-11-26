const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8080",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lib.fstack.com.vn",
                port: "",
                pathname: "/**",
            },
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};

module.exports = nextConfig;
