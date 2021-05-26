import { Menu } from 'antd';
import {
    DesktopOutlined,
    UserSwitchOutlined,
    ProjectOutlined,
    CloudUploadOutlined,
    TeamOutlined,
    BankOutlined,
    ContactsOutlined,
    FolderOutlined,
    FileUnknownOutlined,
    FileDoneOutlined,
    UsergroupAddOutlined,
    BarChartOutlined,
  } from '@ant-design/icons';
  import { Link } from "react-router-dom";

export const links = [
    // {
    //     path: '/',
    //     title: 'page_main',
    //     icon: <DesktopOutlined />
    // },
    // {
    //     path: '/projects',
    //     title: 'page_projects',
    //     icon: <ProjectOutlined />,
    // },
    {
        title: 'sub_page_load_data',
        icon: <CloudUploadOutlined />,
        sublinks: [
            {
                path: '/load/students',
                title: 'page_load_student',
                icon: <TeamOutlined />
            },
            // {
            //     path: '/load/faculties',
            //     title: 'page_load_faculties',
            //     icon: <BankOutlined />
            // },
            {
                path: '/load/gek',
                title: 'gek_info',
                icon: <ContactsOutlined />
            },
            {
                path: '/load/departments',
                title: 'page_load_departments',
                icon: <ContactsOutlined />
            },
            // {
            //     path: '/load/teachers',
            //     title: 'page_load_teacher',
            //     icon: <TeamOutlined />
            // }
        ],
    },
    {
        title: 'sub_page_doc',
        icon: <FolderOutlined />,
        sublinks: [
            {
                path: '/documents',
                title: 'sub_page_doc',
                icon: <FileDoneOutlined />
            },
            {
                path: '/documents/templates',
                title: 'page_template_doc',
                icon: <FileUnknownOutlined />
            },
        ],
    },
    {
        path: '/roles',
        title: 'page_roles',
        icon: <UserSwitchOutlined />
    },
    {
        path: '/users',
        title: 'page_users',
        icon:<UsergroupAddOutlined />
    },
    // {
    //     path: '/statistics',
    //     title: 'page_statistics',
    //     icon: <BarChartOutlined />
    // }
];

export const getMenuLinks = (links, t) => links.map((link, idx) => {
    if (link.sublinks) {
        return (
            <Menu.SubMenu key={idx} icon={link.icon} title={t(link.title)}>
                {link.sublinks.map((link, idy) => {
                    return (
                        <Menu.Item key={`${link.path}/${idy}`} icon={link.icon}>
                            <Link to={link.path}>{t(link.title)}</Link>
                        </Menu.Item>
                    );
                })}
            </Menu.SubMenu>
        );
    }

    return (
        <Menu.Item key={idx} icon={link.icon}>
            <Link to={link.path}>{t(link.title)}</Link>
        </Menu.Item>
    );
});