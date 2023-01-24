import './App.css';
import {useState, useEffect} from "react";
import {getAllStudents} from "./client";
import {Breadcrumb, Layout, Menu, theme, Table, Spin, Empty} from "antd";
import {
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const antIcon = (<LoadingOutlined style={{  fontSize: 24, }}  spin />
);

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching,setFetching] =useState(true);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        }
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const fetchStudent = () => getAllStudents()
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setStudents(data);
            setFetching(false);
        });


    useEffect(() => {
        console.log("Component is mounted");
        fetchStudent();
    }, []);

    const renderStudents=() =>{
        if(fetching){
            return <Spin indicator={antIcon} />;
        }
        if(students.length<0){
            return <Empty />;
        }
        return <Table dataSource={students}
                      columns={columns}
                      bordered
                      title={()=>'Students'}
                      footer={()=>'Footer'}
                      pagination={{ pageSize: 50 }}
                      scroll={{ y: 240 }}
                      rowKey={(students)=>students.id}
            />;
    }

    /*
    if (students.length <= 0) {
        return "no data";
    }
    */



    return (<Layout style={{ minHeight: '100vh', }} >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer, }}/>
                <Content style={{ margin: '0 16px', }}  >
                    <Breadcrumb style={{ margin: '16px 0', }} >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, }} >
                        {renderStudents()}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', }} >
                    by ELR ©2023
                </Footer>
            </Layout>
        </Layout>);
}

export default App;
