import {useState} from "react"
import {Button, Space} from '@arco-design/web-react';
import "@arco-design/web-react/dist/css/arco.css";

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div style={{width: 300, height: 500, padding: 16}}>
      <Space size='large'>
        TODO 设为Newtab页
        <Button type='primary'>Primary</Button>
        <Button type='secondary'>Secondary</Button>
        <Button type='dashed'>Dashed</Button>
        <Button type='outline'>Outline</Button>
        <Button type='text'>Text</Button>
      </Space>
    </div>
  )
}

export default IndexPopup
