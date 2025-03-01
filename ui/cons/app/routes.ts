import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";
export default [
    index("welcome/home.tsx"),

    layout( "./routes/dashboard/dashboard.tsx", [
        ...prefix("dashboard",
            [
                route("entreprises", "./routes/dashboard/compagnies.tsx"),
                index("./routes/dashboard/index.tsx"),
                layout( "./routes/memploi/memploi.tsx", [
                    ...prefix("memploi",
                        [
                            route("employees", "./routes/memploi/employee/index.tsx"),
                            route("recruitment", "./routes/memploi/jobs/index.tsx"),
                            index("./routes/memploi/index.tsx"),
                        ]),
                 ]
                 ),
            ]),
     ]
     ),
     layout( "./routes/compagny/compagny.tsx", [
        ...prefix('compagny',
            [
                index("./routes/compagny/home.tsx")
            ]),
      ]
     ),
     layout( "./welcome/auth.tsx",  [
        ...prefix('auth',
            [
                index("./welcome/login.tsx"),
                route("login-cross-token/:token", "welcome/cross-token.tsx"),
            ]),
    ]),
] satisfies RouteConfig;
