import React, {useState} from "react"
import {Button, Calendar, Input, Layout, Link, Menu, Message, Select, Space, Typography} from '@arco-design/web-react';
import "@arco-design/web-react/dist/css/arco.css";
import "./styles/newtab.css"
import {IconCalendar, IconDown, IconHome, IconSend} from "@arco-design/web-react/icon";
import axios from "axios";

const {Title, Paragraph, Text} = Typography;

const extId = chrome.runtime.id
console.log("Extension ID:", extId)
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const collapsedWidth = 60;
const normalWidth = 220;
const ButtonGroup = Button.Group;

function IndexNewtab() {
  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(normalWidth);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const handleMoving = (_, {width}) => {
    if (width > collapsedWidth) {
      setSiderWidth(width);
      setCollapsed(!(width > collapsedWidth + 20));
    } else {
      setSiderWidth(collapsedWidth);
      setCollapsed(true);
    }
  };

  const [method, setMethod] = useState('GET')
  const [protocol, setProtocol] = useState('http://')
  const [uri, setUri] = useState('localhost:27000/hello')
  const [sendButtonLoading, setSendButtonLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [requestConsumeMilliSeconds, setRequestConsumeMilliSeconds] = useState(0)

  const handleMethodChange = (value) => {
    console.log(value)
    setMethod(value);
  };
  const handleProtocolChange = (value) => {
    setProtocol(value);
  };
  const handleUriChange = (value) => {
    setUri(value);
  };


  const handleClickSend = async () => {
    const startTime = performance.now(); // 记录请求开始时间
    try {
      setSendButtonLoading(true)
      const response = await axios.get(`${protocol}${uri}`)
      setResponse(JSON.stringify(response.data))
    } catch (e) {
      Message.error({
        content: e.message,
        duration: 15000,
        closable: true
      })
    } finally {
      setSendButtonLoading(false)
      const duration = performance.now() - startTime;
      setRequestConsumeMilliSeconds(Math.floor(duration))
    }
  };


  const optionsUrl = chrome.runtime.getURL("options.html");
  const deltaFlyerUrl = chrome.runtime.getURL("tabs/delta-flyer.html");
  return (
    <div className={'container'}>
      <Layout style={{height: '100%'}}>
        <Header style={{height: '8%', background: '#2b6bfe'}}>Omnicaller</Header>
        <Layout style={{maxHeight: '84%'}}>
          <Sider style={{maxWidth: '20%', background: '#6aa1ff'}} collapsible
                 onCollapse={onCollapse}
                 collapsed={collapsed}
                 width={siderWidth}
                 resizeBoxProps={{
                   directions: ['right'],
                   onMoving: handleMoving,
                 }}>
            <div className='logo'/>
            <Menu autoOpen style={{width: '100%', height: '100%'}}>
              <MenuItem key='1' disabled>
                <IconHome/>
                设计指南
              </MenuItem>
              <MenuItem key='2'>
                <IconCalendar/>
                区块
              </MenuItem>
              <MenuItem key='3'>
                <IconCalendar/>
                模块
              </MenuItem>
              <SubMenu key='layout' title={<span><IconCalendar/> 布局组件</span>}>
                <MenuItem key='11'>栅格</MenuItem>
                <MenuItem key='12'>分隔符</MenuItem>
                <MenuItem key='13'>布局</MenuItem>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{width: '80%', background: '#f2f3f5'}}>
            <div style={{height: '300px', padding: '10px', background: 'white'}}>
              <div className={'h-10'}></div>
              <Input
                style={{width: 600}}
                value={uri}
                onChange={handleUriChange}
                addBefore={
                  <div>
                    <Select value={method} onChange={handleMethodChange} placeholder='METHOD'
                            style={{display: 'inline-block', width: 120}}>
                      <Select.Option value='GET'>GET</Select.Option>
                      <Select.Option value='POST'>POST</Select.Option>
                      <Select.Option value='PUT'>PUT</Select.Option>
                      <Select.Option value='DELETE'>DELETE</Select.Option>
                      <Select.Option value='PATCH'>PATCH</Select.Option>
                      <Select.Option value='OPTIONS'>OPTIONS</Select.Option>
                    </Select>
                    <div className={'w-10'}></div>
                    <div className={'w-10'}></div>
                    <div className={'w-10'}></div>
                    <Select value={protocol} onChange={handleProtocolChange}
                            placeholder='PROTOCOL'
                            style={{display: 'inline-block', width: 120}}>
                      <Select.Option value='http://'>HTTP</Select.Option>
                      <Select.Option value='https://'>HTTPS</Select.Option>
                    </Select>
                  </div>
                }
                allowClear={true}
              />
              <div className={'w-10'}></div>
              <ButtonGroup>
                <Button onClick={handleClickSend} loading={sendButtonLoading} type={'primary'}>
                  {!sendButtonLoading && <IconSend style={{
                    transform: 'rotate(-30deg)',
                    fontSize: '18px'
                  }}/>} Send </Button>
                <Button type='primary' icon={<IconDown/>}/>
              </ButtonGroup>
              <div className={'h-10'}></div>
              <div style={{padding: '5px', border: '1px solid blue', fontFamily: 'Consolas'}}>
                <div>request:</div>
                <div>{method} {protocol}{uri}</div>
              </div>
              <div className={'h-10'}></div>
              <div style={{padding: '5px', border: '1px solid red', fontFamily: 'Consolas'}}>
                <div>response:</div>
                <div>{response}</div>
              </div>

              {requestConsumeMilliSeconds > 0 && <div>请求耗时: {requestConsumeMilliSeconds}ms</div>}

            </div>


            <Typography>
              <Title> Hi, 1</Title>
              <Paragraph>
                💪️ Onz~ Om~ Onn~
              </Paragraph>
              <Paragraph>
                <ol>
                  <li>simple simple simple</li>
                  <li>easy easy easy</li>
                  <li>good good good</li>
                </ol>
              </Paragraph>
            </Typography>
            <Space direction='vertical'>
              <Link href={optionsUrl} status='success'>
                To options
              </Link>
              <Link href={deltaFlyerUrl}>
                To delta-flyer
              </Link>
            </Space>
            <div style={{height: 20}}></div>
            <Calendar
              panel
              panelTodayBtn
              style={{marginRight: 50}}
              onChange={(a) => console.log(a)}
            />
          </Content>
        </Layout>
        <Footer style={{height: '8%', background: '#2b6bfe'}}>Footer</Footer>
      </Layout>
    </div>
  )
}

export default IndexNewtab
