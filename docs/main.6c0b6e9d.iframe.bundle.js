(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{466:function(module,exports,__webpack_require__){__webpack_require__(467),__webpack_require__(623),__webpack_require__(624),__webpack_require__(834),__webpack_require__(835),__webpack_require__(841),__webpack_require__(842),__webpack_require__(839),__webpack_require__(837),__webpack_require__(843),__webpack_require__(836),__webpack_require__(838),__webpack_require__(844),module.exports=__webpack_require__(829)},534:function(module,exports){},624:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(329)},829:function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__(329).configure)([__webpack_require__(830),__webpack_require__(831)],module,!1)}).call(this,__webpack_require__(186)(module))},830:function(module,exports){function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=function(){return[]},webpackEmptyContext.resolve=webpackEmptyContext,module.exports=webpackEmptyContext,webpackEmptyContext.id=830},831:function(module,exports,__webpack_require__){var map={"./components/Posts/Posts.stories.js":840};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=831},840:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"FirstStory",(function(){return FirstStory}));__webpack_require__(16),__webpack_require__(832);var react=__webpack_require__(0),react_default=__webpack_require__.n(react),jsx_runtime=(__webpack_require__(24),__webpack_require__(88));react_default.a.createElement;function Posts(_ref){var title=_ref.title,_ref$posts=_ref.posts,posts=void 0===_ref$posts?[]:_ref$posts,PostRecord=function PostRecord(_ref2){var post=_ref2.post;return Object(jsx_runtime.jsx)("div",{children:post.id+" - "+post.title})};return Object(jsx_runtime.jsxs)("div",{children:[Object(jsx_runtime.jsx)("h2",{children:title}),posts.map((function(post){return Object(jsx_runtime.jsx)(PostRecord,{post:post},post.id)})),Object(jsx_runtime.jsx)("hr",{}),Object(jsx_runtime.jsx)("div",{children:"Length: "+posts.length})]})}Posts.displayName="Posts";try{Posts.displayName="Posts",Posts.__docgenInfo={description:"",displayName:"Posts",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},posts:{defaultValue:{value:"[]"},description:"",name:"posts",required:!1,type:{name:"Post[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Posts/Posts.tsx#Posts"]={docgenInfo:Posts.__docgenInfo,name:"Posts",path:"src/components/Posts/Posts.tsx#Posts"})}catch(__react_docgen_typescript_loader_error){}var components_Posts=Posts,Posts_stories_Template=(react_default.a.createElement,__webpack_exports__.default={title:"App/Posts",component:components_Posts},function Template(args){return Object(jsx_runtime.jsx)(components_Posts,Object.assign({},args))});Posts_stories_Template.displayName="Template";var FirstStory=Posts_stories_Template.bind({});FirstStory.args={title:"Post Title",posts:[{id:"1",title:"Title One"},{id:"2",title:"Title Two"}]},FirstStory.parameters=Object.assign({storySource:{source:"args => <Posts {...args} />"}},FirstStory.parameters)},844:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var preview_namespaceObject={};__webpack_require__.r(preview_namespaceObject),__webpack_require__.d(preview_namespaceObject,"parameters",(function(){return parameters}));__webpack_require__(23),__webpack_require__(5),__webpack_require__(46),__webpack_require__(825),__webpack_require__(826),__webpack_require__(44),__webpack_require__(827),__webpack_require__(828),__webpack_require__(412);var client_api=__webpack_require__(852),types=__webpack_require__(850),esm=__webpack_require__(4),parameters={actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}};function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(preview_namespaceObject).forEach((function(key){var value=preview_namespaceObject[key];switch(key){case"args":case"argTypes":return esm.a.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(value));case"decorators":return value.forEach((function(decorator){return Object(client_api.c)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return Object(client_api.d)(loader,!1)}));case"parameters":return Object(client_api.e)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return Object(client_api.a)(enhancer)}));case"argsEnhancers":return value.forEach((function(enhancer){return Object(client_api.b)(enhancer)}));case"render":return Object(types.setGlobalRender)(value);case"globals":case"globalTypes":var v={};return v[key]=value,Object(client_api.e)(v,!1);default:return console.log(key+" was not supported :( !")}}))}},[[466,2,3]]]);