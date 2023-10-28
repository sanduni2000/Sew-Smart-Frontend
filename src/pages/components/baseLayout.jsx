import React from 'react';
import { Layout } from 'antd'
import { Link, Route, Routes, useLocation } from "react-router-dom";

import EveluateMoment from '../eveluateMoment';
import MomentDetection from '../VideoCapture';

const BaseLayout = () => {

    const { Header, Content, Footer } = Layout;

    const { pathname } = useLocation();

    return (
        <Layout className="layout">
            <Header className="navbar">
                <div className="demo-logo">
                    <img src={'./logo.png'} alt="Sew smart" />
                </div>
                <div>
                    <Link to={'/'} className={`nav-item ${pathname === "/" ? 'active-menu' : ''}`}>
                        Eveluate Moment
                    </Link>
                    <Link to={'/moment-detection'} className={`nav-item ${pathname === "/moment-detection" ? 'active-menu' : ''}`}>
                        Moment Detection
                    </Link>
                </div>
            </Header>

            <Content style={{ padding: '30px' }}>
                <div className="site-layout-content">
                    <Routes>
                        <Route path="/" element={<EveluateMoment />} />
                        <Route path="/moment-detection" element={<MomentDetection />} />
                    </Routes>
                </div>
            </Content>

            <Footer className="footer">
                Sew smart | Copyright &copy; 2023
            </Footer>
        </Layout>
    )
}

export default BaseLayout