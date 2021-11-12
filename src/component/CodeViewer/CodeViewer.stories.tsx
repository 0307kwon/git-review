import React from "react";
import CodeViewer from "./CodeViewer";

export default {
  component: CodeViewer,
  title: "Components/CodeViewer",
};

const diffHunk =
  "@@ -1,37 +1,24 @@\n-import axios from 'axios';\n-import React, { FC, useEffect } from 'react';\n-import { useSelector } from 'react-redux';\n+import React from 'react';\n import { Route, Switch } from 'react-router-dom';\n import Subway from './components/@common/Icon/Subway';\n import Header from './components/@shared/Header/Header';\n import Main from './components/@shared/Main/Main';\n import Navigation from './components/@shared/Navigation/Navigation';\n-import { API_INFO } from './constants/api';\n import { APP_TITLE, COMMON_NAV_LIST, PAGE_INFO } from './constants/appInfo';\n import PALETTE from './constants/palette';\n+import useAPIBaseURL from './hooks/useAPIBaseURL';\n+import useLoginManager from './hooks/useLoginManager';\n import Home from './pages/Home/Home';\n import Lines from './pages/Lines/Lines';\n import Login from './pages/Login/Login';\n import Sections from './pages/Sections/Sections';\n import Signup from './pages/Signup/Signup';\n import Stations from './pages/Stations/Stations';\n-import { RootState } from './redux/store';\n-import { getApiOwner, getBearerToken } from './storage/service';\n+import SubwayMap from './pages/SubwayMap/SubwayMap';\n \n-axios.defaults.baseURL = API_INFO[getApiOwner()].endPoint;\n-axios.defaults.headers.common['Authorization'] = getBearerToken();\n-\n-const App: FC = () => {\n-  const apiOwner = useSelector((state: RootState) => state.api.owner);\n-  const isLogin = useSelector((state: RootState) => state.login.isLogin);\n-\n-  useEffect(() => {\n-    axios.defaults.baseURL = API_INFO[apiOwner].endPoint;\n-  }, [apiOwner]);\n-\n-  useEffect(() => {\n-    axios.defaults.headers.common['Authorization'] = getBearerToken();\n-  }, [isLogin]);\n+const App = (): JSX.Element => {\n+  useAPIBaseURL();";

export const Primary = () => {
  return <CodeViewer filePath="code.tsx" diffHunk={diffHunk} />;
};
