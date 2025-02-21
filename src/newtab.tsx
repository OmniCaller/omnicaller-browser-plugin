import {useState} from "react"
import {Calendar, Link, Space, Typography} from '@arco-design/web-react';
import "@arco-design/web-react/dist/css/arco.css";
import "./style.css"

const {Title, Paragraph, Text} = Typography;

const extId = chrome.runtime.id
console.log("Extension ID:", extId)

function IndexNewtab() {
  const [data, setData] = useState("")
  const optionsUrl = chrome.runtime.getURL("options.html");
  const deltaFlyerUrl = chrome.runtime.getURL("tabs/delta-flyer.html");
  return (
    <div style={{padding: 20}}>
      <Typography style={{marginTop: -40}}>
        <Title>Hi, </Title>
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
    </div>
  )
}

export default IndexNewtab
