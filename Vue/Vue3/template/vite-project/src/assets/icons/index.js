// 使用svg-sprite-loader将svg挂载到页面上，使用<use>标签引用
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
const iconMap = requireAll(req);
export default iconMap;
