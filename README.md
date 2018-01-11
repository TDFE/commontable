## zh-CN
集查询条件与搜索一体的基于Table的封装。
可支持样式配置。
可支持组件化传入。
搜索条件可定制。
请参考example文件夹中的js来开发。
时间仓促，以后慢慢补充说明文档。有使用方面的问题或者建议欢迎发邮件到379921506@qq.com与我进行讨论。

````
  import {message} from 'antd';
  import { CommonTable} from 'commontable';
  import NameApplication from './example/NameApplication';
  import s from './lib/index.css'
  import 'whatwg-fetch';
  const afterSearchFn = (resBefore,isSearchList) => {
    if(isSearchList){
        return {
          isSuccess:(resBefore.success && resBefore.code===200),
          list:resBefore.data.list,
          total:resBefore.data.total
        };
     }else{
        return {
          isSuccess:true,
          data:resBefore.data
        };
     }
  }
  const onSearchFn = (url) => {
    return fetch(url).then(res=>res.json());
  }
  const addObjFn = () => {
    message.info('新增成功！');
  };
  const columns = [
    {title:  '日期',dataIndex: 'gmtCreateStr',key: 'gmtCreateStr'},
    {title: '标签名',dataIndex: 'tagName',key: 'tagName'},
    {title: '渠道',dataIndex: 'channel',key: 'channel'},
    {title: '发件人',dataIndex: 'sender',key: 'sender'},
    ],
  const configObj = {
   //参数配置
    params: [
      {
        type: 'rangeDate',
        start: 'startTime',
        end: 'endTime',
        default: 30,
        isTimeStamp:true
      },
      {
        type: 'select',
        title: '标签',
        param: 'tagName',
        defaultKey: '',
        defaultTip: '全部'
      },
      {
        type: 'select',
        title: '渠道',
        param: 'channel',
        defaultKey: '',
        default:'',
        defaultTip: '全部',
        width:130
      },
      {
        type: 'input',
        title: '发件人',
        param: 'sender',
        default: '',
        width:130,
        maxWidth:30
      },
      {
        type: 'component',
        param: 'nameApplication',
        component:NameApplication
      }

    ],
    //按钮配置
    buttons: [
      {
        type: 'search',
        title: '查询'
      },
      {
         type:'add',
         title:'新增',
         callBackFn:addObjFn
       }
    ],
    //查询列表的url
    searchUrl: '',
    //请求参数列表
    paramList: [
       {
          type:"map",
          param: 'tagNameList',
          url:""
       },
       {
          param: 'channelList',
          value: [
          {value: 'sftp', name: 'ftp'},
          {value: 'system', name: '数据平台'}
          ]
       }
    ]
  };

ReactDOM.render(<CommonTable config={configObj} onSearchCallback={onSearchFn} afterSearchCallback={afterSearchFn} columns={columns}/>, mountNode);
````
