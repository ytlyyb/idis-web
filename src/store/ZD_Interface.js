import { post, get, downPost, exportPost, exportExcel } from '../services/http';
import environment from '../environment';
const { HOSTHOME } = environment;
const { HOSTHOME1 } = environment;

export default {
	AMI_LOGIN({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/Authorize/GetToken', params);
	},
	SET_Para({ dispatch, commit, state }, params){
		return post(HOSTHOME + '/GXSerial/SetPara', params);
	},
	GET_IMGCODE({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/login/getCodeImg', params);
	},
	GET_EMAILSEND({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/sendEmailToResetPassword', params);
	},
	SET_NEWPASSWORD({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/auth/resetPasswordByEmail', params);
	},
	GET_AUTROLELIST({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/getAutRoleList', params);
	},
	GET_ROLEACCOUNT({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/getRoleAccount', params);
	},
	GET_AUTHUESRLIST({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/getAuthUserList', params);
	},
	//获取授权模块列表
	GetModuleList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/getModuleList', params);
	},
	//获取所有授权模块列表
	GetAccountModuleList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/api/auth/getAccountModuleList', params);
	},

	//修改账号
	ReviseAccount({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/auth/updateAccount', params);
	},
	ADD_AUTHUSER({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/auth/addAccount', params);
	},

	GET_MODULELIST({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/getAuthModuleList', params);
	},
	ADD_AUTHROLE({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/auth/addAuthRole', params);
	},
	DEL_AUTHACCOUNT({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/deleteAccount', params);
	},
	RESET_AUTHPASSWORD({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/auth/resetPassword', params);
	},
	UPDATE_AUTHMODULE({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/auth/updateAuthModule', params);
	},
	SET_ACCOUNTSTATUS({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/auth/account/status', params);
	},
	CT_INSERT({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/Ct/ctInsert', params);
	},
	//获取授权对象列表
	GET_AUTHOBJECTLIST({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/getAuthObjectList', params);
	},
	//修改角色和对象配置
	UPDATE_AUTHOBJECT({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/auth/updateAuthObject', params);
	},
	CT_DELETE({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/Ct/ctDelete', params); 
	},
	CT_MODIFY({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/Ct/ctUpdate', params);
	},
	CT_SHOW({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/Ct/findByPage', params);
	},
	// 获取账号信息
	GET_USERINFO({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/userInfo', params);
	},

	// 电压等级
	Voltage_SHOW(
		{
			// /Voltage/findByPage
			dispatch,
			commit,
			state
		},
		params
	) {
		return get(HOSTHOME + '/Voltage/findByPage', params);
	},
	Voltage_DELETE(
		{
			// /Voltage/voltageLevelDelete
			dispatch,
			commit,
			state
		},
		params
	) {
		return post(HOSTHOME + '/Voltage/voltageLevelDelete', params);
	},
	Voltage_INSERT(
		{
			// /Voltage/voltageLevelInsert
			dispatch,
			commit,
			state
		},
		params
	) {
		return post(HOSTHOME + '/Voltage/voltageLevelInsert', params);
	},
	Voltage_MODIFY(
		{
			// /Voltage/voltageLevelUpdate
			dispatch,
			commit,
			state
		},
		params
	) {
		return post(HOSTHOME + '/Voltage/voltageLevelUpdate', params);
	},

	// VT管理
	VT_INSERT({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/Vt/vtInsert', params);
	},
	VT_SHOW({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/Vt/findByPage', params);
	},
	VT_DELETE({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/Vt/vtDelete', params);
	},
	VT_MODIFY({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/Vt/vtUpdate', params);
	},

	FACTORY_INSERT({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/factory/factoryInsert', params);
	},
	FACTORY_SHOW({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/factory/findByPage', params);
	},
	FACTORY_DELETE({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/factory/factoryDelete', params);
	},
	FACTORY_MODIFY({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/factory/factoryUpdate', params);
	},
	DESC_SHOW({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/instruction/findByPage', params);
	},
	DESC_MODIFY({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/instruction/instructionUpdate', params);
	},
	DESC_INSERT({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/instruction/instructionInsert', params);
	},
	GET_DESC_FUNCTION({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/instruction/findTypeCode', params);
	},
	DESC_EMPTY({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/instruction/instructionClear', params);
	},
	ABN_SHOW({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/Exception/findByPage', params);
	},
	ABN_MODIFY({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/Exception/exceptionUpdate', params);
	},
	ABN_INSERT({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/Exception/exceptionInsertVO', params);
	},
	GET_ABN_FUNCTION({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/Exception/findTypeCode', params);
	},
	ABN_EMPTY({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/Exception/instructionClear', params);
	},
	//添加集中器
	ArchivesAddRtu({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/archives/addRtu', params);
	},
	//更新集中器
	ArchivesUpdateRtu({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/archives/updateRtu', params);
	},
	//删除集中器
	ArchivesDeleteRtu({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/archives/deleteRtu', params);
	},
	//获取电表列表
	ArchivesGetPowMeterList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/archives/getPowMeterList', params);
	},
	//获取电表注册信息
	AddMeterInfo({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/autoRegister/addMeterInfo', params);
	},
	//获取集中器注册信息
	AddDCUInfo({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/autoRegister/addRtuInfo', params);
	},
	//获取生产厂家
	ArchivesGetFactoryList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/factory/findAll', params);
	},
	//添加分析对象
	AnalysisObjectAdd({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/add', params);
	},
	//添加分析对象根节点
	AnalysisObjectAddRoot({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/addRoot', params);
	},
	//删除分析对象
	AnalysisObjectDelete({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/delete', params);
	},
	//删除分析对象根节点
	AnalysisObjectDeleteRoot({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/deleteRoot', params);
	},
	//修改分析对象
	AnalysisObjectEdit({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/edit', params);
	},
	//修改分析对象节点名称
	AnalysisObjectEditObjectName({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/editObjectName', params);
	},
	//获取修改分析对象节点信息
	AnalysisObjectGetEditObject({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/analysisObject/getEditObject', params);
	},
	//获取分析对象列表
	AnalysisObjectGetTree({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/analysisObject/getTree', params);
	},
	//获取电压等级列表
	AnalysisObjectGetVoltageLevelList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/analysisObject/getVoltageLevelList', params);
	},
	//获取集中器列表
	ArchivesGetRtuList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/archives/getRtuList', params);
	},
	//新增抄读方案
	ReadSchemeAdd({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/readScheme/add', params);
	},
	//修改抄读方案
	ReadSchemeUpdate({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/readScheme/update', params);
	},
	//删除抄读方案
	ReadSchemeDelete({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/readScheme/delete', params);
	},
	// 获取任务类型
	ReadSchemeGetType({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/readScheme/getType', params);
	},
	//新增抄读方案详情
	ReadSchemeDetailAdd({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/readScheme/detail/add', params);
	},
	//修改抄读方案详情
	ReadSchemeDetailUpdate({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/readScheme/detail/update', params);
	},
	//删除抄读方案详情
	ReadSchemeDetailDelete({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/readScheme/detail/delete', params);
	},
	//删除角色
	AuthDeleteAuthRole({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/deleteAuthRole', params);
	},
	//电表注册
	ArchivesMeterRegister({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/archives/meter/register', params);
	},

	//获取当前位置下集中器列表
	ArchivesGetOnlyObjectRtu({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/archives/getOnlyObjectRtu', params);
	},
	//添加集中器
	ArchivesAddRtu({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/archives/addRtu', params);
	},
	//更新集中器
	ArchivesUpdateRtu({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/archives/updateRtu', params);
	},
	//删除集中器
	ArchivesDeleteRtu({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/archives/deleteRtu', params);
	},
	//获取电表列表
	ArchivesGetPowMeterList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/archives/getPowMeterList', params);
	},
	//获取电表列表
	ArchivesGetPowMeterLists({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/computingServicesDataDetect/computingGetMeterList', params);
	},
	//添加电表
	ArchivesAddPowerMeter({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/archives/addPowMeter', params);
	},
	//添加电表批量
	ArchivesAddPowerMeterBatch({ dispatch, commit, state }, params) {
	 	return post(HOSTHOME + '/archives/batchAddMeter', params);
	},
   
	//更新电表
	ArchivesUpdatePowerMeter({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/archives/updatePowMeter', params);
	},
	//删除电表
	ArchivesDeletePowerMeter({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/archives/deletePowMeter', params);
	},
	// 获取转换器列表
	ArchivesGetMdcList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/archives/getMdcList', params);
	},
	// 添加转换器
	ArchivesAddMdc({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/archives/addMdc', params);
	},
	// 更新转换器
	ArchivesUpdateMdc({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/archives/updateMdc', params);
	},
	// 删除转换器
	ArchivesDeleteMdc({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/archives/deleteMdc', params);
	}, 
	//获取生产厂家
	ArchivesGetFactoryList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/factory/findAll', params);
	},
	//获取电表类型
	MeterParamGetType({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/meter/param/getType', params);
	},
	//获取全部CT
	CtFindAll({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/Ct/findAll', params);
	},
	//获取全部VT
	VtFindAll({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/Vt/findAll', params);
	},
	//获取抄读方案
	paramGetReadScheme({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/rtu/param/getReadScheme', params);
	},
	//获取设备版本号
	paramGetDeviceVersion({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/meter/param/getDeviceVersion', params);
	},
	//获取设备类型
	MeterParamGetDeviceType({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/meter/param/getDeviceType', params);
	},
	//获取DLMS数据类型配置
	VersionProtocolGetCfg({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionProtocol/getCfg', params);
	},
	//获取抄读方案详情
	RtuParamGetReadSchemeDetail({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/rtu/param/getReadSchemeDetail', params);
	},
	//获取数据配置项
	VersionProtocolGetDataItem({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/getDataItem', params);
	},
	//获取数据块配置项
	VersionProtocolGetBlockDataItem({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/getBlockDataItem', params);
	},
	//设备操作发送数据
	DeviceCommunicationSend({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/send', params);
	},
	//读设备当前任务
	DeviceCommunicationCurrentMission({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/send', params);
	},
	//清空设备任务
	DeviceCommunicationClearMission({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/send', params);
	},
	// 读设备历史任务
	DeviceCommunicationHistoryTask({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/readDeviceHistoryTask', params);
	},
	// 读设备历史任务明细  
	DeviceCommunicationHistoryTaskDetail({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/readDeviceHistoryTaskDetail', params);
	},

	/**
   * 表计数据
   */
	//设备最新数据
	Get_DataAnalysisFreshData({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/dataAnalysis/freshData', params);
	},
	//设备原始历史数据
	Get_DataAnalysisRawHisData({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/dataAnalysis/rawHisData', params);
	},
	//获取DLMS数据类型配置
	Get_VersionProtocolGetCfg({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionProtocol/getCfg', params);
	},
	//
	VersionProtocol_GetDataItem({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/readScheme/profile', params);
	},

	/**
   * 系统管理 --- 版本管理
   */

	//获取功能分类列表
	FunctionManagementGetFunctionCategory({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/functionManagement/getFunctionCategory', params);
	},

	//添加功能分类
	FunctionManagementAddFunctionCategory({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/functionManagement/addFunctionCategory', params);
	},

	//修改功能分类
	FunctionManagementEditFunctionCategory({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/functionManagement/editFunctionCategory', params);
	},

	//删除功能分类
	FunctionManagementDeleteFunctionCategory({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/functionManagement/deleteFunctionCategory', params);
	},

	//获取功能库列表
	FunctionManagementGetFunctionLibrary({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/functionManagement/getFunctionLibrary', params);
	},

	//添加功能库
	FunctionManagementAddFunctionLibrary({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/functionManagement/addFunctionLibrary', params);
	},

	//修改功能库
	FunctionManagementUpdateFunctionLibrary({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/functionManagement/updateFunctionLibrary', params);
	},
	//删除功能库
	FunctionManagementDeleteFunctionLibrary({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/functionManagement/deleteFunctionLibrary', params);
	},
	//获取协议修改明细库对应树
	ProtocolManagementGetProtocolTree({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/protocolManagement/getProtocolTree', params);
	},
	//获取协议库列表
	ProtocolManagementGetProtocol({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/protocolManagement/getProtocol', params);
	},
	//添加协议库
	ProtocolManagementAddProtocol({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/protocolManagement/addProtocol', params);
	},

	//删除协议库
	ProtocolManagementDeleteProtocol({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/protocolManagement/deleteProtocol', params);
	},

	//修改协议库
	ProtocolManagementUpdateProtocol({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/protocolManagement/updateProtocol', params);
	},

	//设备类型管理
	//添加设备类型
	DeviceTypeAddDeviceType({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceType/addDeviceType', params);
	},
	//删除设备类型
	DeviceTypeDeleteDeviceType({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceType/deleteDeviceType', params);
	},
	//获取设备类型列表
	DeviceTypeGetDeviceType({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceType/getDeviceType', params);
	},
	//获取设备类型修改明细库对应树
	DeviceTypeGetDeviceTypeTreeByDeviceTypeId({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceType/getDeviceTypeTreeByDeviceTypeId', params);
	},
	//修改设备类型
	DeviceTypeGetUpdateDeviceType({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceType/updateDeviceType', params);
	},
	//获取协议库列表
	DeviceTypeGetProtocolList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/protocolManagement/getProtocolList', params);
	},

	//获取版本库列表
	VersionProtocolGetDeviceVersion({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/getDeviceVersionList', params);
	},
	//获取版本库 获取数据块配置项
	VersionProtocolGetVersionListByDeviceTypeId({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/getVersionListByDeviceTypeId', params);
	},
	//获取版本库列表 修改明细库对应树
	VersionProtocolGetDeviceVersionTreeByDeviceVersionId({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/getDeviceVersionTreeByDeviceVersionId', params);
	},

	//添加版本库
	VersionProtocolAddDeviceVersion({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionProtocol/addDeviceVersion', params);
	},
	//修改版本库
	VersionProtocolUpdateDeviceVersion({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionProtocol/updateDeviceVersion', params);
	},
	//删除版本库
	VersionProtocolDeleteDeviceVersion({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionProtocol/deleteDeviceVersion', params);
	},
	//版本库 获取设备类型列表
	DeviceTypeGetDeviceTypeList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceType/getDeviceTypeList', params);
	},
	// 获取账号信息
	GET_USERINFO({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/auth/userInfo', params);
	},
	//主页面-获取事件分组
	The_Event_group({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/eventProcessing/getEventgroup', params);
	},
	//主页面-批量删除
	The_Event_batchDelete({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/batchDelete', params);
	},
	//新增页面-获取事件列表
	Getthe_Event_list({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/eventProcessing/getEventList', params);
	},
	/**
   * 抄表管理——设备档案
   *
   */

	//添加分析对象
	AnalysisObjectAdd({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/add', params);
	},
	//添加分析对象根节点
	AnalysisObjectAddRoot({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/addRoot', params);
	},
	
	//删除分析对象
	AnalysisObjectDelete({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/delete', params);
	},
	//删除分析对象根节点
	AnalysisObjectDeleteRoot({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/deleteRoot', params);
	},
	//修改分析对象
	AnalysisObjectEdit({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/edit', params);
	},
	//修改分析对象节点名称
	AnalysisObjectEditObjectName({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/editObjectName', params);
	},
	//获取修改分析对象节点信息
	AnalysisObjectGetEditObject({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/analysisObject/getEditObject', params);
	},
	//获取分析对象列表
	AnalysisObjectGetTree({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/analysisObject/getTree', params);
	},
	
	//获取电压等级列表
	AnalysisObjectGetVoltageLevelList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/analysisObject/getVoltageLevelList', params);
	},
	//获取集中器列表
	ArchivesGetRtuList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/archives/getRtuList', params);
	},
	//按操作类型获取功能库列表
	FunctionManagementTypeFunction({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/functionManagement/type/function', params);
	},
	//获取批量操作功能库列表
	FunctionBatchTaskManagementTypeFunction({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceCommunication/type/function', params);
	},
	//获取批量操作任务列表
	DeviceOperateBatchTask({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceOperate/batch/task', params);
	},
	//获取批量操作电表列表
	DeviceOperateMeter({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceOperate/meter', params);
	},
	//批量发送
	DeviceCommunicationBatchSend({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/batch/send', params);
	},
	//获取操作任务详情
	DeviceOperateBatchTaskDetail({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceOperate/batch/taskDetail', params);
	},
	//批量重发
	DeviceCommunicationBatchResend({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/batch/resend', params);
	},

	//量产测试重发
	NewResend({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/productiong/batch/resend', params);
	},
	// 获取操作集中器列表
	DeviceOperateRtu({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceOperate/rtu', params);
	},
	//获取集中器下电表列表
	DeviceOperateRtuMeter({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceOperate/rtu/meter', params);
	},
	// 获取操作转换器列表
	DeviceOperateMdc({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceOperate/mdc', params);
	},
	//获取数据块配置项  
	DeviceGetBlockDataItem({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/device/getBlockDataItem', params);
	},
	// 通知补召
	Fill({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/fill', params);
	},
	// 补招记录 
	FillResult({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/fill/result', params);
	},
	// 批量补召
	FillBatch({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/fill/batch', params);
	},
	// 补召记录统计  
	FillCount({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/fill/count', params);
	},
	// 查询电表下完整功能码  
	FindFunctionCodeCompleteEdition({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/findFunctionCodeCompleteEdition', params);
	},
	// 远程升级上传更新文件  
	UploadUpdataFile({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/uploadUpdataFile', params);
	},
	// 获取升级信息  
	GetUpdataLog({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceCommunication/getUpdataLog', params);
	},
	// 获取升级状态 
	GetUpdataStatus({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceCommunication/getUpdataStatus', params);
	},
	// 手动控制更新 
	SetUpdataStatus({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/setUpdataStatus', params);
	},

	/**
   * 用电管理
   * 用户档案
   */
	//新增用户档案
	Set_AddUser({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/user/addUser', params);
	},
	Get_QueryUser({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/user/queryUser', params);
	},
	//查询用户档案详情
	Get_UserDetail({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/user/userDetail', params);
	},
	//新增用户档案
	Set_UserAdduser({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/user/addUser', params);
	},
	//注销用户档案
	User_DeleteUser({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/user/deleteUser', params);
	},
	// 销户 
	SellUserCancel({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sell/user/cancel', params);
	},
	// 删除售电用户 
	SellUserDelete({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sell/user/delete', params);
	},
	//用户表计列表
	Get_QueryUserMeter({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/userMeter/queryUserMeter', params);
	},
	//查询全部ct
	CtFindAll({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/Ct/findAll', params);
	},
	//查询全部vt
	VtFindAll({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/Vt/findAll', params);
	},
	//查询用户档案导出
	Export_QueryUser({ dispatch, commit, state }, params) {
		return exportExcel(HOSTHOME + '/user/queryUser/export', params);
	},
	//用户表计获取示数
	UserMeter_GetParameter({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sell/meter/getLastData', params);
	},
	//修改用户档案
	User_UpdateUser({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/user/updateUser', params);
	},
	//新增用户表计-批量
	UserMeter_AddUserMeterBatch({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/userMeter/addUserMeter/batch', params);
	},
	//用户不可使用表计列表
	UserMeter_QueryNoAvailableMeter({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/userMeter/queryNoAvailableMeter', params);
	},
	//用户表计拆换修改
	UserMeter_ChangeUserMeter({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/userMeter/changeUserMeter', params);
	},
	// 异常事件
	Query_Event({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meterAnalysis/queryPublic/event', params);
	},
	// 公变历史数据
	Query_PublicHistory({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meterAnalysis/queryPublic/history', params);
	},
	// 公变单页分析数据
	Query_PublicAnalysis({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meterAnalysis/queryPublic/analysis', params);
	},
	// 用电分析单页用户和表数据
	Query_MeterUser({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meterAnalysis/queryMeterUser', params);
	},

	// 专变历史数据电能
	Query_SpecialHistoryEnergy({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meterAnalysis/querySpecific/history/energy', params);
	},

	// 专变历史数据
	Query_SpecialHistory({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meterAnalysis/querySpecific/history', params);
	},
	// 专变单页分析数据
	Query_SpecificAnalysis({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meterAnalysis/querySpecific/fresh', params);
	},
	//异常分析接口
	Exception_analysis({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/user/event', params);
	},
	//用电量统计
	Electricity_statistics({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/used/count/energy', params);
	},
	//用电量对比
	Electricity_consumption_contrast({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/used/count/energy/contrast', params);
	},
	//事件统计
	Event_statistics({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/used/count/event', params);
	},
	//电表统计
	Electric_meter_statistics({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/used/count/meter', params);
	},
	//用户统计
	User_statistics({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/used/count/user', params);
	},
	//节点用电量统计
	Node_quantity_statistics({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/used/count/energy/list', params);
	},
	//节点用电负荷极值
	Maximum_power_load_of_node({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/used/count/load/extremum', params);
	},
	//节点用电负荷统计
	Power_load_statistics_of_nodes({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/used/count/load/list', params);
	},
	//查询专变用户分析
	Coulometry_only_change({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meterAnalysis/querySpecific/energyAnalysis', params);
	},
	/**
   * 售电管理
   */
  	//获取售电用户列表
	SellUserList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sell/user/list', params);
	},
	//电价方案列表
	PriceList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/price/list', params);
	},
	//新增电价方案
	PriceAdd({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/price/add', params);
	},
	//删除电价方案
	PriceDelete({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/price/delete', params);
	},
	//修改电价方案
	PriceUpdate({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/price/update', params);
	},
	//获取售电参数
	SellParamGet({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sellParam/get', params);
	},
	//修改售电参数
	SellParamUpdate({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sellParam/add', params);
	},
	//获取电价管理列表
	PriceManage({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/price/manage', params);
	},
	//获取公摊表计列表
	SellMeterPublicList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sell/meter/public/list', params);
	},
	//新增售电用户
	SellUserAdd({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/user/add', params);
	},
	//获取售电用户电表列表
	SellMeterList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sell/meter/list', params);
	},
	//调整电价
	PriceManagePost({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/price/manage', params);
	},
	//调整全部电价
	PriceManageAll({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/price/manage/all', params);
	},
	//删除公摊表
	SellMeterPublicDelete({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sell/meter/public/delete', params);
	},
	//定义公摊表
	SellMeterPublicCreate({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/meter/public/create', params);
	},
	//绑定分摊表计
	SellMeterPartBind({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/meter/part/bind', params);
	},
	//解绑分摊表计
	SellMeterPartUnbind({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/meter/part/unbind', params);
	},
	//获取表计最后数据
	SellMeterGetLastData({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sell/meter/getLastData', params);
	},
	//绑定表计
	SellMeterBind({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/meter/bind', params);
	},
	//表计解绑
	SellMeterUnbind({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/meter/unbind', params);
	},
	//获取绑定表计
	SellMeterGetBindMeter({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sell/meter/getBindMeter', params);
	},
	//修改售电用户
	SellUserUpdate({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/user/update', params);
	},
	//获取分摊表计列表
	SellMeterPartList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/sell/meter/partList', params);
	},

	// 售电客户搜索
	CUSTOMERS_LIST({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/CustomerMainPage/search', params);
	},
	// 售电客户获取模板列表
	CONTENT_LIST({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/CustomerMainPage/getMessageTemplateList', params);
	},
	// 售电客户通断电用户信息
	GET_USER_INFO({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/CustomerMainPage/powerCycleInfo', params);
	},
	// 售电客户通断电
	POWER_STATUS({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/CustomerMainPage/powCycle', params);
	},
	//获取通断电信息
	GET_STATUSINFO({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/CustomerMainPage/getCycleOperation', params);
	},
	// 售电客户催缴
	USER_DUNNING({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/CustomerMainPage/urgedPay', params);
	},
	// 售电客户清零
	RESEET_INFO({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/CustomerMainPage/reset', params);
	},
	CUSTOMERS_DEPARTMENT({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/CustomerMainPage/getChildNodes', params);
	},
	// 售电客户充值
	CUSTOMERS_RECHARGE({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/CustomerMainPage/recharge', params);
	},
	CUSTOMERS_USERINFO({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/CustomerMainPage/getRechargeUserInfo', params);
	},
	/*售电记录*/
	GET_RECORDLIST({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/afterPay/sellElectricityRecord', params);
	},
	// 获取账单列表信息
	GET_BILLLIST({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/afterPay/findUserInfo', params);
	},
	//获取核算信息
	GET_ACCOUNTINGINFO({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/afterPay/getAdjustAccounts', params);
	},
	//获取结算信息
	GET_CLOSEACCOUNTINFO({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/afterPay/getSettleAccountsInfo', params);
	},
	//获取账单信息
	GET_BILLINGINFO({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/afterPay/getBillInfo', params);
	},
	//追退
	GET_RETURNCOST({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/afterPay/additionalOrRefundCost', params);
	},
	//生成账单
	GET_BILL({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/afterPay/generateBill', params);
	},
	//用户结算
	GET_CLOSEACCOUNT({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/afterPay/SettleAccounts', params);
	},
	//历史记录信息
	GET_HISTORICALDATA({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/afterPay/sellHistory', params);
	},
	//收益统计
	Income_statistics({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/count/income', params);
	},
	//收益对比
	Proceeds_contrast({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/count/income/contrast', params);
	},
	//电表统计
	Sell_electricity_meters({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/count/meter', params);
	},
	//售电信息
	Sell_electricity_information({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/count/pay', params);
	},
	//预警用户
	Alert_the_user({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/sell/count/warning', params);
	},
	/**
   * 设备操作
   */
	//获取电表列表数据
	DeviceOperateMeter({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceOperate/meter', params);
	},

	/**
   * 抄表数据
   */
	//抄表数据冻结数据
	Query_DataBilling({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meter/queryDataBilling', params);
	},
	//抄表数据冻结数据导出
	Query_DataBilling_Export({ dispatch, commit, state }, params) {
		return exportExcel(HOSTHOME + '/meter/queryDataBilling/export', params);
	},
	//抄表数据历史数据
	Query_DataHistory({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meter/queryDataHistory', params);
	},
	//抄表数据历史数据导出
	Query_DataHistory_Export({ dispatch, commit, state }, params) {
		return exportExcel(HOSTHOME + '/meter/queryDataHistory/export', params);
	},
	//抄表数据单表
	Query_DataSingle({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meter/queryData/singleUser', params);
	},
	//抄表数据单表导出
	Query_DataSingle_Export({ dispatch, commit, state }, params) {
		return exportExcel(HOSTHOME + '/meter/queryData/singleUser/export', params);
	},
	// 抄表数据  获取BOIS 当前数据类
	Query_CurrentDataFunctionCode({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/currentData/findAllFunctionCode', params);
	},
	// 抄表数据  获取BOIS 
	Query_FunctionCode({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/findAllFunctionCode', params);
	},
	//getTaskId
	Get_taskid({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceCommunication/getTaskId', params);
	},
	// 抄表数据 拉合闸
	Switch_Operation({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/send', params);
	},

	//#region 用电分析
	// 查询公变用户分析数据
	MeterAnalysis_QueryPublic({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meterAnalysis/queryPublic', params);
	},
	// 查询专变用户分析数据
	MeterAnalysis_QuerySpecific({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/meterAnalysis/querySpecific', params);
	},
	//#endregion

	//#region 抄表统计
	// 获取电表接入最新数据
	PowerMeterLast_GetSta({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/PowerMeterLast/getSta', params);
	},
	// 获取通讯成功率最新数据
	PowerMeterLast_GetReadByCommand({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/PowerMeterLast/getReadByCommand', params);
	},
	// 获取数据完整率最新数据
	PowerMeterLast_GetDataByCommand({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/PowerMeterLast/getDataByCommand', params);
	},
	//详情子页面
	// 查询全部工厂
	Factory_FindAll({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/factory/findAll', params);
	},
	// 获得所有电表通讯方式
	MeterStaHistory_GetMeterCommunicationMethods({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/MeterStaHistory/getMeterCommunicationMethods', params);
	},
	// 按参数查找电表
	MeterStaHistory_FindByParam({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/MeterStaHistory/findByParam', params);
	},
	// 终端按日期获取
	RtuStaHistory_FindByDate({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/RtuStaHistory/findByDate', params);
	},
	// 按参数查找成功率历史表
	MeterCommHistory_FindByParam({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/MeterCommHistory/findByParam', params);
	},
	// 按参数查找完整率历史表
	MeterDataHistory_FindByDate({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/MeterDataHistory/findByDate', params);
	},
	//#endregion

	//告警配置
	//数据检测查询
	Data_Detection_Search({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/computingServicesDataDetect/search', params);
	},
	//数据检测新增
	Data_Detection_Insert({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/computingServicesDataDetect/insert', params);
	},
	//数据检测删除
	Data_Detection_delete({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/computingServicesDataDetect/delete', params);
	},
	//数据检测批量删除
	Data_Detection_batchDelete({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/computingServicesDataDetect/batchDelete', params);
	},
	//数据检测更新
	Data_Detection_updata({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/computingServicesDataDetect/updata', params);
	},
	
	//事件分组
    //新增页面-获取事件类别
	Event_Category_getEventClass({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/eventProcessing/getEventClass', params);
	},
	//新增页面-新建事件类型
	Event_Category_insertEventClass({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/insertEventClass', params);
	},
	//新增页面-删除事件类型
	Event_Category_deleteEventClass({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/deleteEventClass', params);
	},
	//新增页面-获取事件级别
	Event_Level_getEventLevel({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/eventProcessing/getEventLevel', params);
	},
	//新增页面-新建事件等级
	Event_Level_insertEventLevel({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/insertEventLevel', params);
	},
	//新增页面-删除事件等级
	Event_Level_deleteEventLevel({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/deleteEventLevel', params);
	},
	//新增页面-新建事件分组
	The_Event_Insertgroup({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/insertEventGroup', params);
	},

	//告警处理新增页面-批量删除
	alarm_Handling_batchDelete({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/alarmProcessing/batchDelete', params);
	},
	//告警处理新增页面-删除
	alarm_Handling_deletes({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/alarmProcessing/deletes', params);
	},
	//告警处理新增页面-获取账号角色
	alarm_Handling_getRole({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/eventProcessing/alarmProcessing/getRoleList', params);
	},
	//告警处理新增页面-新增
	alarm_Handling_insert({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/alarmProcessing/insert', params);
	},
	//告警处理新增页面-查询
	alarm_Handling_search({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/eventProcessing/alarmProcessing/search', params);
	},
	// 告警处理新增页面-编辑
	alarm_Handling_updata({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/alarmProcessing/updata', params);
	},
	//主页面-修改
	The_Event_updata({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/eventProcessing/updata', params);
	},

	//首页
	//首页消息
	Message_Not_message({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/myMianPage/message', params);
	},
	//首页消息未读
	// Message_Not_messageIsRead({ dispatch, commit, state }, params) {
	// 	return post(HOSTHOME + '/myMianPage/messageIsRead', params);
	// },
	//删除模块或者Id
	My_Home_Pagedelete({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/myMianPage/delete', params);
	},
	//查询
	My_Home_PagegetInfo({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/myMianPage/getInfo', params);
	},
	//更新
	My_Home_Pageupdata({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/myMianPage/updata', params);
	},
	//新增
	My_Home_Pageinsert({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/myMianPage/insert', params);
	},

	// 地图
	// 获取聚合对象 
	MapObject({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/map/object', params);
	},
	// 获取电表信息  
	MapPowMeter({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/map/powMeter', params);
	},
	// 获取集中器信息
	MapRtu({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/map/rtu', params);
	},
	// 获取厂站对象信息
	MapStation({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/map/station', params);
	},
	// 获取变压器对象信息
	MapTransformer({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/map/transformer', params);
	},
	// 获取区域对象信息
	MapArea({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/map/area', params);
	},
	// 获取对象信息  
	MapObjectDetail({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/map/object/detail', params);
	},

	// 修改对象坐标  
	MapObjectMove({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/map/object/move', params);
	},

	//企业用电
	//获取企业电表列表
	BusinessArchivesGetMeterList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/businessArchives/getMeterList', params);
	},
	//获取企业电表列表
	BusinessMeterRelationList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/businessArchives/getRelatedMeters', params);
	},
	//添加用电分析对象根节点
	AnalysisObjectAddRootBusiness({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/analysisObject/addRootBusiness', params);
	},
	//获取用电分析对象列表
	AnalysisObjectGetTreeBusiness({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/analysisObject/getTreeBusiness', params);
	},
	//添加关联关系
	ObjMeterRelateAdd({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/businessArchives/addRelationBatch', params);
	},
	//获取基本参数
	BusinessNodeGet({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/businessArchives/settings/basic/get', params);
	},
	//设置基本参数
	BusinessNodeSet({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/businessArchives/settings/basic/set', params);
	},
	//获取预警参数
	BusinessNodeAlarmGet({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/businessArchives/settings/alarm/get', params);
	},
	//设置预警参数
	BusinessNodeAlarmSet({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/businessArchives/settings/alarm/set', params);

	},
	//用点分析-实时数据
	PowerUtilizationAnalysis_RealTimeData({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/powerSupplyUtilizationAnalysis/realTimeData', params);
	},
	//电量历史数据
	PowerUtilizationAnalysis_EnergyHistoryData({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/powerSupplyUtilizationAnalysis/energyHistoryData', params);
	},
	//用电方案-新建
	AddElectricity_Scheme({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/electricityAnalysisSupply/electricitySchemeInsert', params);
	},
	//用电方案-删除
	deleteElectricity_Scheme({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/electricityAnalysisSupply/electricitySchemeDelete', params);
	},
	//用电方案-修改
	UpdateElectricity_Scheme({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/electricityAnalysisSupply/electricitySchemeUpdate', params);
	},
	//用电方案-查询
	SearchElectricity_Scheme({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/electricityAnalysisSupply/electricitySchemeSearch', params);
	},
	//电费分析-主页面
	AnalysisElectricity_Scheme({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/electricityAnalysisSupply/analysis', params);
	},
	//电费分析-更多
	AnalysisMoreElectricity_Scheme({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/electricityAnalysisSupply/analysisMore', params);
	},
	
	//手动录入表码
	//表号模糊查询
	MeterInfo_FuzzySeatchMeterNo({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/manuallyEntry/fuzzySeatchMeterNo', params);
	},
	//表码录入
	MeterInfo_Entry({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/manuallyEntry/meterInfoEntry', params);
	},
	//表码录入-上传图片
	MeterInfo_uploadPictura({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/manuallyEntry/meterInfoEntry/uploadPictura', params);
	},
	//表码记录
	MeterInfo_meterInfoRecord({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/manuallyEntry/meterInfoRecord', params);
	},

	//版本对比
	Version_contrast({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionContrast/versionContrast', params);
	},
    //召读功能码
	VersionsendRead_functionCodeCmd({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionContrast/sendReadFunctionCodeCmd', params);
	},
	//版本对比-添加版本类型
	Version_addDeviceVersion({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionContrast/addDeviceVersion', params);
	},
	//生成token
	Version_getTokenString({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionContrast/getTokenString', params);
	},
	//下发充值token
	Version_setTokenString({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionContrast/setTokenString', params);
	},

	//API接口
	getApi_Docs({ dispatch, commit, state }, params) {
		return get('http://10.10.15.27:20002/apiController/api-docs', params);
	},
	//开启监控
	open_Monitor({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/monitorInterface/openMonitor', params);
	},
	// 关闭监控
	close_Monitor({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/monitorInterface/closeMonitor', params);
	},
	//获取监控接口信息
	getMonitorData_Monitor({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/monitorInterface/getMonitorData', params);
	},
	//接口管理
	interfaceManagement_Monitor({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/monitorInterface/interfaceMonitor', params);
	},
	//导入电表
	MeterInfo_Export({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/MeterInfoExport/importMeterInfo', params);
	},
	//导入集中器
	RtuInfo_Export({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/MeterInfoExport/importRtuInfo', params);
	},
	//数据验证
	checkMeterInfo_Export({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/MeterInfoExport/checkMeterInfoRepeat', params);
	},
	//自动注册查询
	obtainOnlienMeter({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/autoRegister/obtainOnlienMeter', params);
	},
	//电表注册
	autoRegister_addMeter({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/autoRegister/addMeter', params);
	},
	//集中器注册
	autoRegister_autoRegister({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/autoRegister/addRtu', params);
	},
	//流量统计
	traffic_Statistics({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/trafficStatistics/statistics', params);
	},

	//对象电量
	Object_Power({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/trafficObjectData/objectEnergy', params);
	},

	//对象需量
	Object_Demand({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/trafficObjectData/objectDemand', params);
	},

	//获取数据完整率报表
	ReadData_IntegrityRatio({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/readReport/readDataIntegrityRatio', params);
	},

	//获取数据完整率报表数据更新
	Update_ReadDataIntegrityRatio({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/readReport/updateReadDataIntegrityRatio', params);
	},
	//获取报表任务
	GetAuto_TaskDetail({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/reports/getAutoTaskDetail', params);
	},
	//新增报表
	UpdateAuto_GeneralReport({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/reports/addAutoGeneralReport', params);
	},
	//删除报表
	Delete_AutoDetail({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/reports/deleteAutoDetail', params);
	},
	// 报表任务开启/结束
	AutoDetail_Operation({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/reports/autoDetailOperation', params);
	},

	// 报表更新
	Update_AutoGeneralReport({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/reports/updateAutoGeneralReport', params);
	},

	//报表明细
	Get_ReportDetail({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/reports/getReportDetail', params);
	},

	//报表日志明细
	Get_LogDetail({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/reports/getLogDetail', params);
	},

	//通道状态统计
	Channel_StateStatistics({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/readReport/channelStateStatistics', params);
	},

	//通道状态
	Channel_State({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/readReport/channelState', params);
	},

	//对象完整率
	Object_DataIntegrityRatio({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/readReport/objectDataIntegrityRatio', params);
	},

	//批量操作 表格删除接口
	Batch_Delete({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceOperate/batch/delete', params);
	},
	//召读小数位
	Read_Decimalplace({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/readDecimalPlace/decimalPlcae', params);
	},
	//召读通道参数
	Read_ChannelParam({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/versionContrast/sendReadChannelParam', params);
	},
	//首页消息详请
	myMianPage_Message({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/myMianPage/message', params);
	},
	//处理异常消息
	dealWith_EventMessage({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/myMianPage/dealWithEventMessage', params);
	},
	//获取处理异常消息
	get_DealWithEventMessage({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/myMianPage/getDealWithEventMessage', params);
	},
	//已读
	message_IsRead({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/myMianPage/allMessageRead', params);
	},
	//webscoket 消息推送测试
	message_Test({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/messagePushed/messageTest', params);
	},
	//单个已读
	singleMessage_IsRead({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/myMianPage/messageIsRead	', params);
	},
	//远程升级-通道参数数据保存
	saveChannel_Param({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/saveChannelParam', params);
	},

	//导出历史记录
	getHistory_Record({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/downLoad/getHistoryRecord', params);
	},
	//远程升级 进页面时，检查设备是否有正在更新的任务，有则返回upgradeId,没有data=null
	checkUpdate_Status({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/checkUpdateStatus', params);
	},
	//开始更新
	start_Upgrade({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/startUpgrade', params);
	},
	// 远程升级-读版本号
	read_Version({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/send', params);
	},
	//远程升级-总清
	clear_All({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/clearAll', params);
	},
	//远程升级-通道参数招读-获取原来版本内的通道参数
	getRawBlock_DataItem({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/getRawBlockDataItem', params);
	},

	//集中器远程操作 --历史数据查询
	getRtu_AllFunctionCode({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/rtu/rtuFindAllFunctionCode', params);
	},
	//电表远程操作--预付费 充值记录
	getToken_releaseRecord({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionContrast/token/releaseRecord', params);
	},
	//电表远程操作 通过  获取功能码列表
	getEventLog_FunctionCodeList({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/versionProtocol/getEventLogFunctionCode', params);
	},
	//批量开始升级
	batch_StartUpgrade({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/batch/startUpgrade', params);
	},
	//远程升级-获取批量升级详细信息
	batch_GetUpgradeDetail({ dispatch, commit, state }, params) {
		return post(HOSTHOME + '/deviceCommunication/batch/getUpgradeDetail', params);
	},
	// 明细循环获取
	batch_UpgradeTaskDetail({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceOperate/batch/taskDetail/upgrade', params);
	},
	//获取设备状态
	get_DeviceRegistStatus({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceOperate/device/regist/status', params);
	},
	//失败重发批量升级
	batch_UpgradeResend({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/deviceOperate/batch/upgrade/resend', params);
	},	
	//获取通讯成功率最新数据(分类)
	mianPage_GetReadByCommand({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/mianPage/PowerMeterLast/getReadByCommand', params);
	},	
	//获取数据完整率最新数据(分类)
	mianPage_GetDataByCommand({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/mianPage/PowerMeterLast/getDataByCommand', params);
	},	
	//获取电表接入最新数据 数量
	mianPage_PowerMeterLastGetSta({ dispatch, commit, state }, params) {
		return get(HOSTHOME + '/mianPage/PowerMeterLast/getSta', params);
	},		
	
	
	

	

	
	
	

};
