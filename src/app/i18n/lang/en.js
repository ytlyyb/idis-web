import enLocale from 'element-ui/lib/locale/lang/en'
import deepmerge from 'deepmerge'
let lang = { idisLogin: { username: 'Username', verificationCode: 'Verification Code', signIn: 'Sign In', loginByAccount: 'Account password login', 
    rememberpassword: 'Store password', forgetpassword: 'Forgot password', login: 'Login', input_account: 'Please enter your account number.', 
    input_password: 'Please enter your password', input_code: 'Please enter verification code', input_email: 'Please enter email', 
    limit_password: 'The length should be between 6 and 25 characters', limit_code: 'The range is between -100 and 100',
     requesterror: 'Network request error!', login_success: 'Login successful', limit_account: 'Please enter letters and underscores', 
     error_login: 'Incorrect username or password, please try again.', backToLogin: 'Back to login', recoverPassword: 'Retrieve password', 
     nextStep: 'Next step', email_limit: 'Please enter correct email', email_tip1: 'We have sent your email', email_tip2: 'Sent a password recovery email', 
     enterEmail: 'Enter the mailbox', notReceive: 'Did not receive', resend: 'Resend', emailSend: 'Mail sent successfully', setNewPassword: 'Set new password', 
     input_newPassword: 'Please enter a password of 6~25 characters with upper and lower case', 
     input_newPasswordAgain: 'Please enter 6~25 digits with upper and lower case confirmation password again', complete: 'Complete', 
     notmatch_password: 'The two passwords do not match', you_refresh_too_often: 'You refresh too often, please try again later.', 
    edit_success: 'Set successfully' ,password:'Password'},idisTips:{
        isLogout:'Log Out or Not',
    },idisPage:{tip:'Tips',comfirm:'OK',cancel:'Cancel',},idisMenu:{
        homePage:'Home Page',
    },idisMenu:{ terminalOperate:'Terminal Operate',pushNotification:'Message Management',AutomaticRegistration:'Automatic Registration',publicUserPage:'PublicUser-More', specificUserPage:'SpecificUser-More',meterOperate:'Meter Operate',example:'Example',example1:'Example1',test:'test',home:'Home Page',homePage:'Home Page',mapShow:'MapShow',meterReading:'Meter Reading',deviceParameter:'Device Parameter',deviceOperate:'Device Operate',meterData:'Meter Data',readingReport:'Reading Report',powerUsed:'Power Used',powerUser:'Power User',userReading:'Meter Data',readingDetail:'Data Details',userPower:'User Power',userEvent:'User Event',userReport:'User Report',powerSale:'Power Sale',sellingUser:'Selling User',powerSelling:'Power Selling',sellingConfig:'Selling Config',powerPrice:'Power Price',sellingReport:'Selling Report',powerSupply:'Power Supply',businessModel:'Business Model',supplyEnergy:'Supply Energy',supplyLoad:'Supply Load',loadControl:'Load Control',supplyReport:'Supply Report',powerDistribute:'Power Distribute',gridModel:'Grid Model',distributeEnergy:'Distribute Energy',substation:'Substation',gridLoss:'Grid Loss',distributeReport:'Distribute Report',ITOps:'TTOps',deviceMonitor:'Device Monitor',anomalyAnalysis:'Anomaly Analysis',workOrder:'Work Order',maintainReport:'Maintain Report',APIInterface:'API Interface',APIMonitor:'API Monitor',APILog:'API Log',APIReport:'API Report',systemConfig:'System Config',accountAuthority:'Account Authority',meterVersion:'Meter Version',parameterConfig:'Parameter Config',userProfile:'User Profile',reportConfig:'Report Config',sureDelete:'Are you sure delete',meterDetails:'Meter Details',protocolAdd:'Protocol Add',typesAdd:'Types Add',repositoryAdd:'Repository Add',statementManagement:'Statement Management'} }
const en = deepmerge(lang, enLocale, { clone: true })
export default en