import { type RouteConfig, index, route } from "@react-router/dev/routes";
export default [
    index("welcome/home.tsx"),

    route("dashboard", "./routes/dashboard/dashboard.tsx", [
        route("entreprises", "./routes/dashboard/compagnies.tsx"),
        index("./routes/dashboard/index.tsx"),
    ]
     ),
     route("memploi", "./routes/memploi/memploi.tsx", [
        route("employees", "./routes/memploi/employee/index.tsx"),
        index("./routes/memploi/index.tsx"),
    ]
     ),
     route("compagny", "./routes/compagny/compagny.tsx", [
        index("./routes/compagny/home.tsx"),
      ]
     ),
     route("auth", "./welcome/auth.tsx",  [
           index("./welcome/login.tsx"),
           route("login-cross-token/:token", "welcome/cross-token.tsx"),
    ]),
] satisfies RouteConfig;
