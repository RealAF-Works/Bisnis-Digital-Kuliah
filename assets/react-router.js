import o from"@babel/runtime/helpers/esm/inheritsLoose";import t from"react";import e from"prop-types";import{createMemoryHistory as n,createLocation as r,locationsAreEqual as i,createPath as a}from"history";import s from"tiny-warning";import u from"mini-create-react-context";import c from"tiny-invariant";import p from"@babel/runtime/helpers/esm/extends";import l from"path-to-regexp";import{isValidElementType as d}from"react-is";import h from"@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";import m from"hoist-non-react-statics";var f=function createNamedContext(o){var t=u();t.displayName=o;return t};var v=f("Router-History");var y=f("Router");var E=function(e){o(Router,e);Router.computeRootMatch=function computeRootMatch(o){return{path:"/",url:"/",params:{},isExact:"/"===o}};function Router(o){var t;t=e.call(this,o)||this;t.state={location:o.history.location};t._isMounted=false;t._pendingLocation=null;o.staticContext||(t.unlisten=o.history.listen((function(o){t._isMounted?t.setState({location:o}):t._pendingLocation=o})));return t}var n=Router.prototype;n.componentDidMount=function componentDidMount(){this._isMounted=true;this._pendingLocation&&this.setState({location:this._pendingLocation})};n.componentWillUnmount=function componentWillUnmount(){if(this.unlisten){this.unlisten();this._isMounted=false;this._pendingLocation=null}};n.render=function render(){return t.createElement(y.Provider,{value:{history:this.props.history,location:this.state.location,match:Router.computeRootMatch(this.state.location.pathname),staticContext:this.props.staticContext}},t.createElement(v.Provider,{children:this.props.children||null,value:this.props.history}))};return Router}(t.Component);if("production"!==process.env.NODE_ENV){E.propTypes={children:e.node,history:e.object.isRequired,staticContext:e.object};E.prototype.componentDidUpdate=function(o){"production"!==process.env.NODE_ENV?s(o.history===this.props.history,"You cannot change <Router history>"):void 0}}var R=function(e){o(MemoryRouter,e);function MemoryRouter(){var o;for(var t=arguments.length,r=new Array(t),i=0;i<t;i++)r[i]=arguments[i];o=e.call.apply(e,[this].concat(r))||this;o.history=n(o.props);return o}var r=MemoryRouter.prototype;r.render=function render(){return t.createElement(E,{history:this.history,children:this.props.children})};return MemoryRouter}(t.Component);if("production"!==process.env.NODE_ENV){R.propTypes={initialEntries:e.array,initialIndex:e.number,getUserConfirmation:e.func,keyLength:e.number,children:e.node};R.prototype.componentDidMount=function(){"production"!==process.env.NODE_ENV?s(!this.props.history,"<MemoryRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { MemoryRouter as Router }`."):void 0}}var N=function(t){o(Lifecycle,t);function Lifecycle(){return t.apply(this,arguments)||this}var e=Lifecycle.prototype;e.componentDidMount=function componentDidMount(){this.props.onMount&&this.props.onMount.call(this,this)};e.componentDidUpdate=function componentDidUpdate(o){this.props.onUpdate&&this.props.onUpdate.call(this,this,o)};e.componentWillUnmount=function componentWillUnmount(){this.props.onUnmount&&this.props.onUnmount.call(this,this)};e.render=function render(){return null};return Lifecycle}(t.Component);function Prompt(o){var e=o.message,n=o.when,r=void 0===n||n;return t.createElement(y.Consumer,null,(function(o){o?void 0:"production"!==process.env.NODE_ENV?c(false,"You should not use <Prompt> outside a <Router>"):c(false);if(!r||o.staticContext)return null;var n=o.history.block;return t.createElement(N,{onMount:function onMount(o){o.release=n(e)},onUpdate:function onUpdate(o,t){if(t.message!==e){o.release();o.release=n(e)}},onUnmount:function onUnmount(o){o.release()},message:e})}))}if("production"!==process.env.NODE_ENV){var g=e.oneOfType([e.func,e.string]);Prompt.propTypes={when:e.bool,message:g.isRequired}}var _={};var D=1e4;var O=0;function compilePath(o){if(_[o])return _[o];var t=l.compile(o);if(O<D){_[o]=t;O++}return t}function generatePath(o,t){void 0===o&&(o="/");void 0===t&&(t={});return"/"===o?o:compilePath(o)(t,{pretty:true})}function Redirect(o){var e=o.computedMatch,n=o.to,a=o.push,s=void 0!==a&&a;return t.createElement(y.Consumer,null,(function(o){o?void 0:"production"!==process.env.NODE_ENV?c(false,"You should not use <Redirect> outside a <Router>"):c(false);var a=o.history,u=o.staticContext;var l=s?a.push:a.replace;var d=r(e?"string"===typeof n?generatePath(n,e.params):p({},n,{pathname:generatePath(n.pathname,e.params)}):n);if(u){l(d);return null}return t.createElement(N,{onMount:function onMount(){l(d)},onUpdate:function onUpdate(o,t){var e=r(t.to);i(e,p({},d,{key:e.key}))||l(d)},to:n})}))}"production"!==process.env.NODE_ENV&&(Redirect.propTypes={push:e.bool,from:e.string,to:e.oneOfType([e.string,e.object]).isRequired});var b={};var V=1e4;var M=0;function compilePath$1(o,t){var e=""+t.end+t.strict+t.sensitive;var n=b[e]||(b[e]={});if(n[o])return n[o];var r=[];var i=l(o,r,t);var a={regexp:i,keys:r};if(M<V){n[o]=a;M++}return a}function matchPath(o,t){void 0===t&&(t={});("string"===typeof t||Array.isArray(t))&&(t={path:t});var e=t,n=e.path,r=e.exact,i=void 0!==r&&r,a=e.strict,s=void 0!==a&&a,u=e.sensitive,c=void 0!==u&&u;var p=[].concat(n);return p.reduce((function(t,e){if(!e&&""!==e)return null;if(t)return t;var n=compilePath$1(e,{end:i,strict:s,sensitive:c}),r=n.regexp,a=n.keys;var u=r.exec(o);if(!u)return null;var p=u[0],l=u.slice(1);var d=o===p;return i&&!d?null:{path:e,url:"/"===e&&""===p?"/":p,isExact:d,params:a.reduce((function(o,t,e){o[t.name]=l[e];return o}),{})}}),null)}function isEmptyChildren(o){return 0===t.Children.count(o)}function evalChildrenDev(o,t,e){var n=o(t);"production"!==process.env.NODE_ENV?s(void 0!==n,"You returned `undefined` from the `children` function of <Route"+(e?' path="'+e+'"':"")+">, but you should have returned a React element or `null`"):void 0;return n||null}var w=function(e){o(Route,e);function Route(){return e.apply(this,arguments)||this}var n=Route.prototype;n.render=function render(){var o=this;return t.createElement(y.Consumer,null,(function(e){e?void 0:"production"!==process.env.NODE_ENV?c(false,"You should not use <Route> outside a <Router>"):c(false);var n=o.props.location||e.location;var r=o.props.computedMatch?o.props.computedMatch:o.props.path?matchPath(n.pathname,o.props):e.match;var i=p({},e,{location:n,match:r});var a=o.props,s=a.children,u=a.component,l=a.render;Array.isArray(s)&&isEmptyChildren(s)&&(s=null);return t.createElement(y.Provider,{value:i},i.match?s?"function"===typeof s?"production"!==process.env.NODE_ENV?evalChildrenDev(s,i,o.props.path):s(i):s:u?t.createElement(u,i):l?l(i):null:"function"===typeof s?"production"!==process.env.NODE_ENV?evalChildrenDev(s,i,o.props.path):s(i):null)}))};return Route}(t.Component);if("production"!==process.env.NODE_ENV){w.propTypes={children:e.oneOfType([e.func,e.node]),component:function component(o,t){if(o[t]&&!d(o[t]))return new Error("Invalid prop 'component' supplied to 'Route': the prop is not a valid React component")},exact:e.bool,location:e.object,path:e.oneOfType([e.string,e.arrayOf(e.string)]),render:e.func,sensitive:e.bool,strict:e.bool};w.prototype.componentDidMount=function(){"production"!==process.env.NODE_ENV?s(!(this.props.children&&!isEmptyChildren(this.props.children)&&this.props.component),"You should not use <Route component> and <Route children> in the same route; <Route component> will be ignored"):void 0;"production"!==process.env.NODE_ENV?s(!(this.props.children&&!isEmptyChildren(this.props.children)&&this.props.render),"You should not use <Route render> and <Route children> in the same route; <Route render> will be ignored"):void 0;"production"!==process.env.NODE_ENV?s(!(this.props.component&&this.props.render),"You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"):void 0};w.prototype.componentDidUpdate=function(o){"production"!==process.env.NODE_ENV?s(!(this.props.location&&!o.location),'<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'):void 0;"production"!==process.env.NODE_ENV?s(!(!this.props.location&&o.location),'<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'):void 0}}function addLeadingSlash(o){return"/"===o.charAt(0)?o:"/"+o}function addBasename(o,t){return o?p({},t,{pathname:addLeadingSlash(o)+t.pathname}):t}function stripBasename(o,t){if(!o)return t;var e=addLeadingSlash(o);return 0!==t.pathname.indexOf(e)?t:p({},t,{pathname:t.pathname.substr(e.length)})}function createURL(o){return"string"===typeof o?o:a(o)}function staticHandler(o){return function(){"production"!==process.env.NODE_ENV?c(false,"You cannot %s with <StaticRouter>",o):c(false)}}function noop(){}var P=function(e){o(StaticRouter,e);function StaticRouter(){var o;for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];o=e.call.apply(e,[this].concat(n))||this;o.handlePush=function(t){return o.navigateTo(t,"PUSH")};o.handleReplace=function(t){return o.navigateTo(t,"REPLACE")};o.handleListen=function(){return noop};o.handleBlock=function(){return noop};return o}var n=StaticRouter.prototype;n.navigateTo=function navigateTo(o,t){var e=this.props,n=e.basename,i=void 0===n?"":n,a=e.context,s=void 0===a?{}:a;s.action=t;s.location=addBasename(i,r(o));s.url=createURL(s.location)};n.render=function render(){var o=this.props,e=o.basename,n=void 0===e?"":e,i=o.context,a=void 0===i?{}:i,s=o.location,u=void 0===s?"/":s,c=h(o,["basename","context","location"]);var l={createHref:function createHref(o){return addLeadingSlash(n+createURL(o))},action:"POP",location:stripBasename(n,r(u)),push:this.handlePush,replace:this.handleReplace,go:staticHandler("go"),goBack:staticHandler("goBack"),goForward:staticHandler("goForward"),listen:this.handleListen,block:this.handleBlock};return t.createElement(E,p({},c,{history:l,staticContext:a}))};return StaticRouter}(t.Component);if("production"!==process.env.NODE_ENV){P.propTypes={basename:e.string,context:e.object,location:e.oneOfType([e.string,e.object])};P.prototype.componentDidMount=function(){"production"!==process.env.NODE_ENV?s(!this.props.history,"<StaticRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { StaticRouter as Router }`."):void 0}}var x=function(e){o(Switch,e);function Switch(){return e.apply(this,arguments)||this}var n=Switch.prototype;n.render=function render(){var o=this;return t.createElement(y.Consumer,null,(function(e){e?void 0:"production"!==process.env.NODE_ENV?c(false,"You should not use <Switch> outside a <Router>"):c(false);var n=o.props.location||e.location;var r,i;t.Children.forEach(o.props.children,(function(o){if(null==i&&t.isValidElement(o)){r=o;var a=o.props.path||o.props.from;i=a?matchPath(n.pathname,p({},o.props,{path:a})):e.match}}));return i?t.cloneElement(r,{location:n,computedMatch:i}):null}))};return Switch}(t.Component);if("production"!==process.env.NODE_ENV){x.propTypes={children:e.node,location:e.object};x.prototype.componentDidUpdate=function(o){"production"!==process.env.NODE_ENV?s(!(this.props.location&&!o.location),'<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'):void 0;"production"!==process.env.NODE_ENV?s(!(!this.props.location&&o.location),'<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'):void 0}}function withRouter(o){var n="withRouter("+(o.displayName||o.name)+")";var r=function C(e){var r=e.wrappedComponentRef,i=h(e,["wrappedComponentRef"]);return t.createElement(y.Consumer,null,(function(e){e?void 0:"production"!==process.env.NODE_ENV?c(false,"You should not use <"+n+" /> outside a <Router>"):c(false);return t.createElement(o,p({},i,e,{ref:r}))}))};r.displayName=n;r.WrappedComponent=o;"production"!==process.env.NODE_ENV&&(r.propTypes={wrappedComponentRef:e.oneOfType([e.string,e.func,e.object])});return m(r,o)}var L=t.useContext;function useHistory(){"production"!==process.env.NODE_ENV&&("function"===typeof L?void 0:"production"!==process.env.NODE_ENV?c(false,"You must use React >= 16.8 in order to use useHistory()"):c(false));return L(v)}function useLocation(){"production"!==process.env.NODE_ENV&&("function"===typeof L?void 0:"production"!==process.env.NODE_ENV?c(false,"You must use React >= 16.8 in order to use useLocation()"):c(false));return L(y).location}function useParams(){"production"!==process.env.NODE_ENV&&("function"===typeof L?void 0:"production"!==process.env.NODE_ENV?c(false,"You must use React >= 16.8 in order to use useParams()"):c(false));var o=L(y).match;return o?o.params:{}}function useRouteMatch(o){"production"!==process.env.NODE_ENV&&("function"===typeof L?void 0:"production"!==process.env.NODE_ENV?c(false,"You must use React >= 16.8 in order to use useRouteMatch()"):c(false));var t=useLocation();var e=L(y).match;return o?matchPath(t.pathname,o):e}if("production"!==process.env.NODE_ENV&&"undefined"!==typeof window){var U=window;var S="__react_router_build__";var T={cjs:"CommonJS",esm:"ES modules",umd:"UMD"};if(U[S]&&"esm"!==U[S]){var Y=T[U[S]];var k=T.esm;throw new Error("You are loading the "+k+" build of React Router on a page that is already running the "+Y+" build, so things won't work right.")}U[S]="esm"}export{R as MemoryRouter,Prompt,Redirect,w as Route,E as Router,P as StaticRouter,x as Switch,v as __HistoryContext,y as __RouterContext,generatePath,matchPath,useHistory,useLocation,useParams,useRouteMatch,withRouter};

//# sourceMappingURL=react-router.js.map