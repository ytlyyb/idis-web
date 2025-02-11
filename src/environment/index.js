import dev from './index_inner.js';
import pro from './index_outer.js';
const env = process.env.NODE_ENV === 'production' ? pro : dev;
export default  env
// export { default }
//     from './index_outer_test';
//     // from './index_outer';
// //   from './index_inner';