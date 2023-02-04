import './App.css';
import {useState, useEffect} from "react";
import {deleteStudent, getAllStudents} from "./client";
import {Breadcrumb, Layout, Menu, theme, Table, Spin, Empty, Button, Badge, Tag, Avatar, Radio, Popconfirm} from "antd";
import {
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined, PlusOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import StudentDrawerForm from "./StudentDrawerForm";
import {errorNotification, successNotification} from "./Notification";


const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

const antIcon = (<LoadingOutlined style={{fontSize: 24,}} spin/>
);

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const TheAvatar=({name})=>{
        let trim=name.trim();
        if(trim.length===0){
            return  <Avatar style={{backgroundColor:'#e8a775', color:'#f5a00'}} icon={<UserOutlined/>}/>
        }
        const split=trim.split(" ");
        if(split.length===1){
            return  <Avatar>{name.charAt(0)}</Avatar>
        }
        return <Avatar>
                     {`${name.charAt(0)}${name.charAt(name.length-1)}`}
               </Avatar>
    }


    const removeStudent = (studentId, callback) => {
        deleteStudent(studentId).then(() => {
            successNotification( "Student deleted", `Student with ${studentId} was deleted`);
            callback();
        }).catch(err=>{
            err.response.json().then(res=>{
                console.log(res);
                errorNotification("There wa an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        })
    }

    const columns = fetchStudents => [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text,students)=> <TheAvatar  name={students.name}/>
        },
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
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render:(text, students)=>
               <Radio.Group>
                    <Popconfirm
                        placement='topRight'
                        title={`Ar you sure to delete ${students.name} `}
                        onConfirm={()=>removeStudent(students.id,fetchStudents)}
                        okText={'Yes'}
                        cancelText={'No'}>
                        <Radio.Button value={'small'}>Delete</Radio.Button>
                     </Popconfirm>
                    <Radio.Button value={'small'}>Edit</Radio.Button>
               </Radio.Group>

        }
    ];

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const fetchStudents = () =>
        getAllStudents()
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setStudents(data);
        }).catch(err=>{
            console.log(err.response)
            err.response.json().then(res=>{
                console.log(res);
                errorNotification("There wa an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                );
            });
        }).finally(()=>{
                setFetching(false);
        });


    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>;
        }
        if (students.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Student
                </Button>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Empty/>
            </>
        }
        return <>
                    <StudentDrawerForm
                        showDrawer={showDrawer}
                        setShowDrawer={setShowDrawer}
                        fetchStudents={fetchStudents}
                    />
                    <Table dataSource={students}
                                columns={columns(fetchStudents)}
                                bordered
                                title={() =>
                                    <>
                                        <Tag >Number of students</Tag>
                                        <Badge count={students.length} className="site-badge-count-4"/>
                                        <br/><br/>
                                        <Button
                                            onClick={() => setShowDrawer(!showDrawer)}
                                            type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                                            Add New Student
                                        </Button>
                                    </>
                                }
                                footer={() => 'Footer'}
                                pagination={{pageSize: 50}}
                                scroll={{y: 500}}
                                rowKey={(students) => students.id}
                    />
        </>;
    }

    /*
    if (students.length <= 0) {
        return "no data";
    }
    */


    return (<Layout style={{minHeight: '100vh',}}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)',}}/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
        </Sider>
        <Layout className="site-layout">
            <Header style={{padding: 0, background: colorBgContainer,}}/>
            <Content style={{margin: '0 16px',}}>
                <Breadcrumb style={{margin: '16px 0',}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{padding: 24, minHeight: 360, background: colorBgContainer,}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center',}}>
                by ELR ©2023
            </Footer>
        </Layout>
    </Layout>);
}

export default App;
