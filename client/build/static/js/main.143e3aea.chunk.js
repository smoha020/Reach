(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{117:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(10),l=a.n(r),s=(a(90),a(17)),c=a(18),i=a(20),u=a(19),m=(a(91),a(11)),d=a(14),p=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"home-container"},o.a.createElement("div",{className:"home-left"},o.a.createElement("div",{className:"home-left-mid"},o.a.createElement("div",null,"Be heard"),o.a.createElement("div",null,"Be seen"),o.a.createElement("div",null,"Connect with others"))),o.a.createElement("div",{className:"home-right"},o.a.createElement("div",{className:"home-right-top"},o.a.createElement("p",null,"Welcome to Reach")),o.a.createElement("div",{className:"home-right-mid"},o.a.createElement(m.b,{to:"/Register",style:{textDecoration:"none"}},o.a.createElement("div",{className:"home-right-mid-btn"},"Sign Up")),o.a.createElement(m.b,{to:"/LogIn",style:{textDecoration:"none"}},o.a.createElement("div",{className:"home-right-mid-btn"},"Log In"))))),o.a.createElement("footer",null,o.a.createElement("p",null,"smoha020@ucr.edu")))}}]),a}(n.Component),h=a(22),E=a(21),b=a(152),f=a(13),g=a.n(f),S=function(e){return{type:"GET_CURRENTUSER_SUCCESS",payload:e}},v=function(e){return{type:"GET_CURRENTUSER_FAILURE",payload:e}},C=function(){return function(e){e({type:"LOADING_REQUEST"}),console.log("loading being set for getAuth"),g.a.get("/api/test").then((function(t){e(S(t)),console.log("loading no longer set for getAuth")})).catch((function(t){e(v(t))}))}},y=function(e){return function(t){t({type:"LOADING_REQUEST"}),g.a.post("/api/users/login",e).then((function(e){console.log(e),t(S(e))})).catch((function(e){t(v(e))}))}},O=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).onChange=function(e){n.setState(Object(h.a)({},e.target.name,e.target.value))},n.onSubmit=function(e){e.preventDefault();var t={email:n.state.email,password:n.state.password};console.log("b4 signIn"),t.email&&t.password&&n.props.signIn(t)},n.state={email:"",password:""},n}return Object(c.a)(a,[{key:"render",value:function(){console.log(this.props);var e,t=this.props,a=t.currentUser;return t.loading||(a&&a.credentials?this.props.history.push("/Dashboard/CurrentUser"):e=o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"my-nav"},o.a.createElement(m.b,{to:"/"},o.a.createElement("div",{className:"link-div"},"Home")),o.a.createElement(m.b,{to:"/Register"},o.a.createElement("div",{className:"link-div"},"Sign Up"))),o.a.createElement("br",null),o.a.createElement("div",{className:"container"},o.a.createElement("form",{onSubmit:this.onSubmit},o.a.createElement("div",{className:"register-form"},o.a.createElement("div",{className:"register-form-child"},o.a.createElement(b.a,{className:"register-text-input",id:"standard-basic",label:"email",type:"email",name:"email",value:this.state.email,onChange:this.onChange})),o.a.createElement("div",{className:"register-form-child"},o.a.createElement(b.a,{className:"register-text-input",id:"standard-basic",label:"password",type:"password",name:"password",value:this.state.password,onChange:this.onChange})),o.a.createElement("div",{className:"register-form-child"},o.a.createElement("input",{className:"register-submit",type:"submit",value:"Sign In"}))))))),o.a.createElement(o.a.Fragment,null,e)}}]),a}(n.Component),w=Object(E.b)((function(e){return{loading:e.Authenticate.loading,currentUser:e.Authenticate.currentUser}}),(function(e){return{signIn:function(t){return e(y(t))}}}))(O),U=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).onChange=function(e){n.setState(Object(h.a)({},e.target.name,e.target.value))},n.onSubmit=function(e){e.preventDefault();var t={username:n.state.username,email:n.state.email,password:n.state.password};t&&t.username&&t.email&&t.password&&n.props.registerUser(t)},n.state={username:"",email:"",password:""},n}return Object(c.a)(a,[{key:"render",value:function(){console.log(this.props);var e,t=this.props,a=t.currentUser;return t.loading||(a&&a.credentials?(e=o.a.createElement("div",null,"Loading..."),this.props.history.push("/Dashboard/CurrentUser")):e=o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"my-nav"},o.a.createElement(m.b,{to:"/"},o.a.createElement("div",{className:"link-div"},"Home")),o.a.createElement(m.b,{to:"/LogIn"},o.a.createElement("div",{className:"link-div"},"Log In"))),o.a.createElement("br",null),o.a.createElement("div",null,o.a.createElement("br",null),o.a.createElement("form",{onSubmit:this.onSubmit},o.a.createElement("div",{className:"register-form"},o.a.createElement("div",{className:"register-form-child"},o.a.createElement(b.a,{className:"register-text-input",id:"standard-basic",label:"name",type:"username",name:"username",value:this.state.username,onChange:this.onChange})),o.a.createElement("div",{className:"register-form-child"},o.a.createElement(b.a,{className:"register-text-input",id:"standard-basic",label:"email",type:"email",name:"email",value:this.state.email,onChange:this.onChange})),o.a.createElement("div",{className:"register-form-child"},o.a.createElement(b.a,{className:"register-text-input",id:"standard-basic",label:"password",type:"password",name:"password",value:this.state.password,onChange:this.onChange})),o.a.createElement("div",{className:"register-form-child"},o.a.createElement("input",{className:"register-submit",type:"submit",value:"Register"}))))))),o.a.createElement(o.a.Fragment,null,e)}}]),a}(n.Component),k=Object(E.b)((function(e){return{loading:e.Authenticate.loading,currentUser:e.Authenticate.currentUser}}),(function(e){return{registerUser:function(t){return e(function(e){return function(t){t({type:"LOADING_REQUEST"}),g.a.post("/api/users/register",e).then((function(a){console.log(a);var n={email:e.email,password:e.password};t(y(n))})).catch((function(e){t(v(e))}))}}(t))}}}))(U),_=function(e){return function(t){g.a.get("/api/social/posts/single/".concat(e)).then((function(e){t(function(e){return{type:"GET_POST_SUCCESS",payload:e}}(e))})).catch((function(e){t(function(e){return{type:"GET_POST_FAILURE",payload:e}}(e))}))}},N=a(26),j=a(150),P=a(47),T=a.n(P),I=a(48),D=a.n(I),L=a(74),R=a.n(L);var A=function(e){console.log(e);var t,a=e.currentUser,n=e.allPosts,r=e.notesColor,l=e.visible,s=e.handleShow,c=e.handleShow2,i=e.logOut,u=e.param,d=e.changeNotes;console.log(e);var p=[];return t=a.notifications.map((function(e,t){var a=n.find((function(t){return t._id===e.postId}));return a?(p=[].concat(Object(N.a)(p),[a]),console.log("myPost is not undefined: "+p),"like"===e.notType?o.a.createElement("div",{key:t,variant:"primary",onClick:function(){c(a,e)}},e.sender," liked your post "):o.a.createElement("div",{key:t,variant:"primary",onClick:function(){c(a,e)}},e.sender," commented on your post ")):null})),o.a.createElement("div",{className:"my-nav"},o.a.createElement("div",{className:"brand-name"},"Reach"),o.a.createElement("div",{className:"move-right"},o.a.createElement("div",{className:"notes-display"},o.a.createElement(j.a,{className:"notes-icon",color:"secondary",badgeContent:0!=p.length?p.length:0},o.a.createElement(T.a,{style:{fontSize:30,color:"".concat(r)},onClick:d})),l?o.a.createElement("div",{className:"notes-menu"},t):null),u===a.credentials.username||"CurrentUser"===u?o.a.createElement(D.a,{className:"post-icon",style:{fontSize:30},onClick:s}):o.a.createElement(m.b,{style:{textDecoration:"none"},to:"/Dashboard/CurrentUser"},o.a.createElement(R.a,{className:"post-icon",style:{fontSize:30}})),o.a.createElement("div",{onClick:i,className:"log-out"},"Log Out")))},F=a(49),x=a.n(F),G=a(154),M=a(53),H=function(){return{background:"#2196f3",color:"white",border:"none",cursor:"pointer",padding:"3%"}};var B=function(e){var t=e.user,a=e.nameCheck,n=e.handleShow4,r=e.handleShow3;return o.a.createElement("div",{className:"profile"},o.a.createElement("div",{className:"profile-pic"},t.pic?o.a.createElement("img",{src:"data:image/png;base64,".concat(t.pic),alt:"jpg"}):o.a.createElement("div",{className:"profile-pic-second"}),t.credentials.username===a?o.a.createElement("div",{className:"profile-pic-btn",style:{margin:"1%"}},o.a.createElement(x.a,{style:{fontSize:30,color:"#2196f3",cursor:"pointer"},onClick:n})):null),o.a.createElement("div",{className:"profile-details"},o.a.createElement("p",{style:{fontWeight:"bold",fontSize:"x-large"}},t.credentials.username),t.credentials.location?o.a.createElement("p",null,"From: ",t.credentials.location):null,t.credentials.bio?o.a.createElement("p",null,"About: ",t.credentials.bio):null,t.credentials.website?o.a.createElement("p",null,t.credentials.website):null,o.a.createElement("p",null,"Joined: ",o.a.createElement(G.a,{date:t.credentials.joinDate,locale:"en-US"})),t.credentials.username===a?o.a.createElement(M.a,{variant:"primary",onClick:r},"Update Profile"):null))},z=a(9);var K=function(e){var t=e.show,a=e.handleClose,n=e.onSubmit,r=e.body,l=e.onChange;return o.a.createElement(z.a,{show:t,onHide:a},o.a.createElement("form",{onSubmit:n},o.a.createElement(z.a.Header,{closeButton:!0},o.a.createElement(z.a.Title,null,"New Post")),o.a.createElement(z.a.Body,{style:{width:"100%"}},o.a.createElement("textarea",{type:"text",name:"body",value:r,style:{background:"rgb(230, 234, 247)",width:"90%"},onChange:function(e){l(e)}})),o.a.createElement(z.a.Footer,null,o.a.createElement("p",{style:H(),onClick:a},"Close"),o.a.createElement("input",{style:H(),type:"submit",value:"post"}))))};var W=function(e){var t=e.show4,a=e.handleClose4,n=e.onSubmitPic,r=e.onChangePic;return o.a.createElement(z.a,{show:t,onHide:a},o.a.createElement("form",{onSubmit:function(e){n(e)}},o.a.createElement(z.a.Header,{closeButton:!0},o.a.createElement(z.a.Title,null,"Update Pic")),o.a.createElement(z.a.Body,null,o.a.createElement("label",null,o.a.createElement("input",{type:"file",onChange:function(e){r(e)}}))),o.a.createElement(z.a.Footer,null,o.a.createElement("p",{style:H(),onClick:a},"Close"),o.a.createElement("input",{style:H(),type:"submit",value:"update"}))))},Q=a(151),J=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).onChange=function(e){console.log(n.state.comment),n.setState(Object(h.a)({},e.target.name,e.target.value))},n.submitComment=function(e){if(e.preventDefault(),""!=n.state.comment){console.log("not blank");var t={body:n.state.comment,user:n.props.currentUser.credentials.username,postId:n.props.postId};console.log(t),n.props.addComment(t),n.setState({comment:""})}},n.deleteComment=function(e){console.log(e),n.props.deleteComment(e)},n.state={posts:[],post:"",comment:"",loading:""},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){console.log("didMount"),this.props.getPost(this.props.postId)}},{key:"render",value:function(){var e=this;console.log(this.props);var t,a,n,r=this.props,l=r.post,s=r.currentUser,c=r.postId;return l?l.data._id===c?(a=l.data.comments.map((function(t){return n=t.user==s.credentials.username?o.a.createElement("button",{onClick:e.deleteComment.bind(e,t)},"x"):"",o.a.createElement("div",{className:"comment",key:t._id},o.a.createElement("div",{className:"comment-pic"},t.pic?o.a.createElement("img",{src:"data:image/png;base64,".concat(t.pic),alt:"jpg"}):o.a.createElement("div",{className:"comment-pic-second"})),o.a.createElement("div",{className:"comment-right"},o.a.createElement("div",{className:"comment-right-top"},o.a.createElement("div",{className:"comment-name"},o.a.createElement(m.b,Object(h.a)({style:{textDecoration:"none"},to:"/Dashboard/User/".concat(t.user)},"style",{fontWeight:"bold"}),t.user)),o.a.createElement("div",{className:"comment-time"},o.a.createElement(G.a,{date:t.createdAt,locale:"en-US"})),o.a.createElement("div",{className:"comment-delete"},n)),o.a.createElement("div",{className:"comment-body"},t.body," ")))})),t=o.a.createElement("div",null,o.a.createElement("div",{className:"post"},o.a.createElement("div",{className:"post-pic"},l.data.pic?o.a.createElement("img",{src:"data:image/png;base64,".concat(l.data.pic),alt:"jpg"}):o.a.createElement("div",{className:"post-pic-second"})),o.a.createElement("div",{className:"post-right"},o.a.createElement("div",{className:"post-right-top"},o.a.createElement("div",{className:"post-name"},o.a.createElement(m.b,Object(h.a)({style:{textDecoration:"none"},to:"/Dashboard/User/".concat(l.data.user)},"style",{fontWeight:"bold"}),l.data.user)),o.a.createElement("div",{className:"post-time"},o.a.createElement(G.a,{date:l.data.createdAt,locale:"en-US"}))),o.a.createElement("div",{className:"post-body"},l.data.body))),o.a.createElement("br",null),a,o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("div",{className:"input-container"},o.a.createElement("form",{onSubmit:this.submitComment},o.a.createElement("div",{className:"text-cont"},o.a.createElement("input",{className:"input-text",type:"text",name:"comment",value:this.state.comment,placeholder:"write a comment",onChange:this.onChange})),o.a.createElement("div",{className:"submit-cont"},o.a.createElement("input",{className:"input-submit",type:"submit",value:"submit"})))))):t=o.a.createElement("div",{style:{height:"40vh",display:"flex",justifyContent:"center",alignItems:"center"}},o.a.createElement(Q.a,null)):(console.log("first round"),t=o.a.createElement("div",{style:{height:"40vh",display:"flex",justifyContent:"center",alignItems:"center"}},o.a.createElement(Q.a,null))),o.a.createElement(o.a.Fragment,null,t)}}]),a}(n.Component),$=Object(E.b)((function(e){return{post:e.Data.post,currentUser:e.Authenticate.currentUser}}),(function(e){return{getPost:function(t){return e(_(t))},addComment:function(t){return e(function(e){return function(t){g.a.post("/api/social/posts/createcomment/".concat(e.postId),e).then((function(e){console.log(e.data),t({type:"ADD_COMMENT_SUCCESS",payload:e.data})})).catch((function(e){}))}}(t))},deleteComment:function(t){return e(function(e){return function(t){t({type:"LOADING_POST"}),console.log("before the put "),g.a.put("/api/social/posts/deletecomment/".concat(e.postId),e).then((function(){t(_(e.postId))})).catch((function(e){}))}}(t))}}}))(J);var q=function(e){var t=e.show2,a=e.handleClose2,n=e.postId;return console.log(e),o.a.createElement(z.a,{show:t,onHide:a},o.a.createElement(z.a.Header,{closeButton:!0},o.a.createElement(z.a.Title,null,"Post")),o.a.createElement(z.a.Body,null,o.a.createElement($,{postId:n})),o.a.createElement(z.a.Footer,null))};var V=function(e){var t=e.show3,a=e.handleClose3,n=e.onSubmitProfile,r=e.onChange,l=e.username,s=e.bio,c=e.location,i=e.website;return o.a.createElement(z.a,{show:t,onHide:a},o.a.createElement("form",{onSubmit:n},o.a.createElement(z.a.Header,{closeButton:!0},o.a.createElement(z.a.Title,null,"Update My Profile")),o.a.createElement(z.a.Body,{style:{width:"100%"}},o.a.createElement("label",null,o.a.createElement("input",{type:"text",name:"username",value:l,placeholder:"username",style:{background:"rgb(230, 234, 247)",width:"90%"},onChange:function(e){r(e)}})),o.a.createElement("label",null,o.a.createElement("input",{type:"text",name:"bio",value:s,placeholder:"bio",style:{background:"rgb(230, 234, 247)",width:"90%"},onChange:function(e){r(e)}})),o.a.createElement("label",null,o.a.createElement("input",{type:"text",name:"location",value:c,placeholder:"location",style:{background:"rgb(230, 234, 247)",width:"90%"},onChange:function(e){r(e)}})),o.a.createElement("label",null,o.a.createElement("input",{type:"text",name:"website",value:i,placeholder:"website",style:{background:"rgb(230, 234, 247)",width:"90%"},onChange:function(e){r(e)}}))),o.a.createElement(z.a.Footer,null,o.a.createElement("p",{style:H(),onClick:a},"Close"),o.a.createElement("input",{style:H(),type:"submit",value:"update"}))))},X=a(51),Y=a.n(X),Z=a(50),ee=a.n(Z),te=a(52),ae=a.n(te);var ne=function(e){var t,a,n=e.posts,r=e.currentUser,l=e.deletePost,s=e.likes,c=e.disabled,i=e.clickLike,u=e.clickUnlike,d=e.handleShow2;return n.map((function(e,n){return t=e.user==r.credentials.username?o.a.createElement("button",{onClick:function(){l(e)}},"Delete"):"",a=[],a=s.map((function(t){if(t.postId===e._id)return e._id})),o.a.createElement(o.a.Fragment,{key:n},o.a.createElement("div",{className:"post"},o.a.createElement("div",{className:"post-pic"},e.pic?o.a.createElement(m.b,{style:{textDecoration:"none"},to:"/Dashboard/User/".concat(e.user)},o.a.createElement("img",{src:"data:image/png;base64,".concat(e.pic),alt:"jpg"})):o.a.createElement("div",{className:"post-pic-second"})),o.a.createElement("div",{className:"post-right"},o.a.createElement("div",{className:"post-right-top"},o.a.createElement("div",{className:"post-name"},o.a.createElement(m.b,Object(h.a)({style:{textDecoration:"none"},to:"/Dashboard/User/".concat(e.user)},"style",{fontWeight:"bold"}),e.user)),o.a.createElement("div",{className:"post-time"},o.a.createElement(G.a,{date:e.createdAt,locale:"en-US"})),o.a.createElement("div",{className:"post-delete"},t)),o.a.createElement("div",{className:"post-body"},e.body),o.a.createElement("div",{className:"post-bottom"},o.a.createElement("div",{className:"bottom-thumb"},a.includes(e._id)?o.a.createElement("button",{disabled:c,onClick:function(){u(e._id)}},o.a.createElement(ee.a,{style:{fontSize:20,color:"#2196f3",cursor:"pointer"}})):o.a.createElement("button",{disabled:c,onClick:function(){i(e._id)}},o.a.createElement(Y.a,{style:{fontSize:20,color:"#2196f3",cursor:"pointer"}})),o.a.createElement("div",null,e.likeCount)),o.a.createElement("div",{className:"bottom-comment"},o.a.createElement("div",null,o.a.createElement(ae.a,{style:{fontSize:20,color:"#2196f3",cursor:"pointer"},onClick:function(){d(e)}})),o.a.createElement("div",null,e.commentCount))))))}))};var oe=function(e){var t,a=e.currentUser,n=e.posts,r=e.body,l=e.notesColor,s=e.visible,c=e.deletePost,i=e.likes,u=e.disabled,m=e.clickLike,d=e.clickUnlike,p=e.handleShow,h=e.handleShow2,E=e.show,b=e.handleClose,f=e.onSubmit,g=e.show2,S=e.handleClose2,v=e.postId,C=e.show3,y=e.handleClose3,O=e.onSubmitProfile,w=e.onChange,U=e.username,k=e.bio,_=e.location,N=e.website,j=e.show4,P=e.handleClose4,T=e.onSubmitPic,I=e.onChangePic,D=e.handleShow4,L=e.handleShow3,R=(e.match,e.changeNotes),F=e.logOut;console.log(e),t=o.a.createElement(ne,{posts:n,currentUser:a,deletePost:c,likes:i,disabled:u,clickLike:m,clickUnlike:d,handleShow2:h});var x=a.credentials.username;return o.a.createElement(o.a.Fragment,null,o.a.createElement(K,{show:E,handleClose:b,onSubmit:f,body:r,onChange:w}),o.a.createElement(q,{show2:g,handleClose2:S,postId:v}),o.a.createElement(V,{show3:C,handleClose3:y,onSubmitProfile:O,onChange:w,username:U,bio:k,location:_,website:N}),o.a.createElement(W,{show4:j,handleClose4:P,onSubmitPic:T,onChangePic:I}),o.a.createElement(A,{currentUser:a,allPosts:n,notesColor:l,visible:s,handleShow:p,param:"CurrentUser",handleShow2:h,logOut:F,changeNotes:R}),o.a.createElement("div",{className:"display-flex"},o.a.createElement(B,{user:a,nameCheck:x,handleShow4:D,handleShow3:L}),o.a.createElement("div",{className:"post-container"},t)))};var re=function(){return o.a.createElement("div",{style:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}},o.a.createElement(Q.a,null))},le=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"componentDidMount",value:function(){console.log("componentDidMount User"),this.props.getOtherUser(this.props.match.params.user)}},{key:"render",value:function(){var e,t,a=this.props,n=a.otherUser,r=a.currentUser,l=a.posts,s=a.body,c=a.notesColor,i=a.visible,u=a.deletePost,m=a.likes,d=a.disabled,p=a.clickLike,h=a.clickUnlike,E=a.handleShow,b=a.handleShow2,f=a.show,g=a.handleClose,S=a.onSubmit,v=a.show2,C=a.handleClose2,y=a.postId,O=a.show3,w=a.handleClose3,U=a.onSubmitProfile,k=a.onChange,_=a.username,N=a.bio,j=a.location,P=a.website,T=a.show4,I=a.handleClose4,D=a.onSubmitPic,L=a.onChangePic,R=a.handleShow4,F=a.handleShow3,x=a.match,G=a.changeNotes,M=a.logOut,H=x.params.user;if(n){if(H===n.credentials.username){var z=r.credentials.username;return console.log(z),e=n.posts,console.log(this.props),t=o.a.createElement(ne,{posts:e,currentUser:r,deletePost:u,likes:m,disabled:d,clickLike:p,clickUnlike:h,handleShow2:b}),o.a.createElement(o.a.Fragment,null,o.a.createElement(K,{show:f,handleClose:g,onSubmit:S,body:s,onChange:k}),o.a.createElement(q,{show2:v,handleClose2:C,postId:y}),z===n.credentials.username?o.a.createElement(o.a.Fragment,null,o.a.createElement(V,{show3:O,handleClose3:w,onSubmitProfile:U,onChange:k,username:_,bio:N,location:j,website:P}),o.a.createElement(W,{show4:T,handleClose4:I,onSubmitPic:D,onChangePic:L})):null,o.a.createElement(A,{currentUser:r,allPosts:l,notesColor:c,visible:i,handleShow:E,param:H,handleShow2:b,logOut:M,changeNotes:G}),o.a.createElement("div",{className:"display-flex"},o.a.createElement(B,{user:n,nameCheck:z,handleShow4:R,handleShow3:F}),o.a.createElement("div",{className:"post-container"},t)))}return o.a.createElement("loadingPost",null)}return o.a.createElement(re,null)}}]),a}(n.Component),se=Object(E.b)((function(e){return{otherUser:e.Data.otherUser,loadingPost:e.Data.loadingPost}}),(function(e){return{getOtherUser:function(t){return e(function(e){return function(t){g.a.get("/api/users/otheruser/".concat(e)).then((function(e){t(function(e){return{type:"GET_OTHER_USER_SUCCESS",payload:e}}(e.data))})).catch((function(e){t({type:"GET_OTHER_USER_FAILURE",payload:e})}))}}(t))}}}))(le);var ce=function(e){return console.log("Test"),o.a.createElement("h1",null,"TEST PAGE")},ie=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleShow=function(){n.setState({show:!0})},n.handleClose=function(){n.setState({show:!1})},n.handleShow2=function(e,t){console.log(e),n.setState({show2:!0,postId:e._id}),t&&!1===t.read&&n.props.NoteRead(t)},n.handleClose2=function(){1==n.state.visible?(n.setState({show2:!1}),console.log("refresh?")):(n.setState({show2:!1}),console.log("inside handleClose2"))},n.handleShow3=function(){n.setState({show3:!0})},n.handleClose3=function(){n.setState({show3:!1})},n.handleShow4=function(){n.setState({show4:!0})},n.handleClose4=function(){n.setState({show4:!1})},n.onChange=function(e){n.setState(Object(h.a)({},e.target.name,e.target.value))},n.onSubmit=function(e){if(e.preventDefault(),n.state.body){var t={body:n.state.body,user:n.props.currentUser.credentials.username};n.props.createPost(t),n.setState({show:!1})}},n.clickLike=function(e){n.setState({disabled:!0}),setTimeout((function(){n.setState({disabled:!1})}),2500),console.log(e);var t={postId:e,user:n.props.currentUser.credentials.username};n.props.likePost(t)},n.clickUnlike=function(e){n.setState({disabled:!0}),setTimeout((function(){n.setState({disabled:!1})}),2500);var t={postId:e,user:n.props.currentUser.credentials.username};n.props.unlikePost(t)},n.onSubmitProfile=function(e){if(e.preventDefault(),n.state.bio||n.state.location||n.state.website){var t={_id:n.props.currentUser.credentials._id,bio:n.state.bio,location:n.state.location,website:n.state.website};g.a.post("/users/update/".concat(t._id),t).then((function(e){n.props.getAuthenticated(),n.setState({show3:!1})})).catch((function(e){}))}},n.onChangePic=function(e){n.setState({pic:e.target.files[0]})},n.onSubmitPic=function(e){e.preventDefault();var t=new FormData;t.append("pic",n.state.pic,n.state.pic.name),g.a.post("/users/uploadImage",t).then((function(e){window.location.reload()})).catch((function(e){console.log(e)}))},n.deletePost=function(e){n.props.deletePost(e)},n.logOut=function(){n.props.signOut()},n.changeNotes=function(){n.state.visible?n.setState({visible:!1,notesColor:"white"}):n.setState({visible:!0,notesColor:"#0d47a1"})},n.state={posts:[],body:"",comment:"",show:!1,show2:!1,show3:!1,show4:!1,postId:"",disabled:!1,pic:"",username:"",bio:"",location:"",website:"",notes:"notes",visible:!1,notesColor:"white"},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){0===this.props.posts.length&&(console.log("componentDidMount: "+this.props.posts.length),this.props.getPosts())}},{key:"render",value:function(){var e,t=this,a=this.props,n=a.currentUser,r=a.posts,l=a.loading,s=a.likes;if(console.log(this.props),l)return console.log("dash loading"),o.a.createElement(re,null);if(n&&""!=n.credentials){if(0!=r.length)return o.a.createElement(m.a,null,o.a.createElement(d.a,{path:"/Dashboard/CurrentUser",render:function(e){return o.a.createElement(oe,Object.assign({},e,{currentUser:n,posts:r,notesColor:t.state.notesColor,visible:t.state.visible,handleShow:t.handleShow,body:t.state.body,deletePost:t.deletePost,logOut:t.logOut,changeNotes:t.changeNotes,likes:s,disabled:t.state.disabled,clickLike:t.clickLike,clickUnlike:t.clickUnlike,handleShow2:t.handleShow2,show:t.state.show,handleClose:t.handleClose,onSubmit:t.onSubmit,show2:t.state.show2,handleClose2:t.handleClose2,postId:t.state.postId,show3:t.state.show3,handleClose3:t.handleClose3,onSubmitProfile:t.onSubmitProfile,onChange:t.onChange,username:t.state.username,bio:t.state.bio,location:t.state.location,website:t.state.website,show4:t.state.show4,handleClose4:t.handleClose4,onSubmitPic:t.onSubmitPic,onChangePic:t.onChangePic,handleShow4:t.handleShow4,handleShow3:t.handleShow3}))}}),o.a.createElement(d.a,{path:"/Dashboard/User/:user",render:function(e){return o.a.createElement(se,Object.assign({},e,{currentUser:n,posts:r,body:t.state.body,notesColor:t.state.notesColor,visible:t.state.visible,handleShow:t.handleShow,deletePost:t.deletePost,logOut:t.logOut,changeNotes:t.changeNotes,likes:s,disabled:t.state.disabled,clickLike:t.clickLike,clickUnlike:t.clickUnlike,handleShow2:t.handleShow2,show:t.state.show,handleClose:t.handleClose,onSubmit:t.onSubmit,show2:t.state.show2,handleClose2:t.handleClose2,postId:t.state.postId,show3:t.state.show3,handleClose3:t.handleClose3,onSubmitProfile:t.onSubmitProfile,onChange:t.onChange,username:t.state.username,bio:t.state.bio,location:t.state.location,website:t.state.website,show4:t.state.show4,handleClose4:t.handleClose4,onSubmitPic:t.onSubmitPic,onChangePic:t.onChangePic,handleShow4:t.handleShow4,handleShow3:t.handleShow3}))}}),o.a.createElement(d.a,{path:"/Dashboard/Test",component:ce}));e=o.a.createElement(re,null)}else this.props.history.push("/LogIn");return o.a.createElement("div",null,e)}}]),a}(n.Component),ue=Object(E.b)((function(e){return{currentUser:e.Authenticate.currentUser,likes:e.Authenticate.likes,posts:e.Data.posts,loading:e.Authenticate.loading}}),(function(e){return{getPosts:function(){return e((function(e){g.a.get("/api/social/posts").then((function(t){var a=t.data.map((function(e){return e}));console.log(a),e(function(e){return{type:"GET_POSTS_SUCCESS",payload:e}}(a))})).catch((function(t){e(function(e){return{type:"GET_POSTS_FAILURE",payload:e}}(t))}))}))},createPost:function(t){return e((a=t,function(e){g.a.post("/api/social/posts/create",a).then((function(t){e({type:"CREATE_POST_SUCCESS",payload:t})})).catch((function(t){e({type:"CREATE_POST_FAILURE",payload:t})}))}));var a},signOut:function(){return e((function(e){e({type:"LOADING_REQUEST"}),g.a.get("/api/users/logout").then((function(t){e({type:"LOG_OUT_SUCCESS"})})).catch((function(t){e(function(e){return{type:"LOG_OUT_FAILURE",payload:e}}(t))}))}))},deletePost:function(t){return e(function(e){return function(t){g.a.delete("/api/social/posts/".concat(e._id)).then((function(a){t(function(e){return{type:"DELETE_POST_SUCCESS",payload:e}}(e))})).catch((function(e){t({type:"DELETE_POST_FAILURE",payload:e})}))}}(t))},likePost:function(t){return e(function(e){return function(t){g.a.post("/api/social/like/".concat(e.postId),e).then((function(){console.log("likePost is called"),t(function(e){return{type:"LIKE_POST_SUCCESS",payload:e}}(e))})).catch((function(e){t(function(e){return{type:"LIKE_POST_FAILURE",payload:e}}(e))}))}}(t))},unlikePost:function(t){return e(function(e){return function(t){g.a.post("/api/social/unlike/".concat(e.postId),e).then((function(){console.log("unLikePost is called"),t(function(e){return{type:"UNLIKE_POST_SUCCESS",payload:e}}(e))})).catch((function(e){}))}}(t))},updateUser:function(t){return e(function(e){return function(t){t({type:"LOADING_REQUEST"}),g.a.post("/api/users/update/".concat(e._id),e).then((function(e){console.log(e),t(S(e))})).catch((function(e){t(v(e))}))}}(t))},getAuthenticated:function(){return e(C())},NoteRead:function(t){return e(function(e){return function(t){g.a.put("/api/social/notificationRead/".concat(e._id)).then((function(a){t(function(e){return{type:"GET_NOTEREAD_SUCCESS",payload:e}}(e))})).catch((function(e){return console.log(e)}))}}(t))}}}))(ie),me=(n.Component,function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){return Object(s.a)(this,a),t.call(this,e)}return Object(c.a)(a,[{key:"componentDidMount",value:function(){console.log("componentDidMount"),this.props.getAuthenticated()}},{key:"render",value:function(){return console.log(this.props),o.a.createElement(m.a,null,o.a.createElement(d.a,{exact:!0,path:"/",component:p}),o.a.createElement(d.a,{path:"/logIn",component:w}),o.a.createElement(d.a,{path:"/Register",component:k}),o.a.createElement(d.a,{path:"/Dashboard",component:ue}))}}]),a}(n.Component)),de=Object(E.b)((function(e){return{currentUser:e.Authenticate.currentUser}}),(function(e){return{getAuthenticated:function(){return e(C())}}}))(me);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(116);var pe=a(30),he=a(5),Ee={otherUser:"",posts:[],post:"",error:"",comment:"",loadingPost:!0},be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOADING_POST":return Object(he.a)(Object(he.a)({},e),{},{loadingPost:!0});case"GET_POSTS_SUCCESS":return{posts:Object(N.a)(t.payload),error:""};case"GET_POSTS_FAILURE":return{posts:[],error:t.payload};case"CREATE_POST_SUCCESS":return{posts:[t.payload.data].concat(Object(N.a)(e.posts)),error:""};case"CREATE_POST_FAILURE":return Object(he.a)(Object(he.a)({},e),{},{error:t.payload});case"GET_POST_SUCCESS":return Object(he.a)(Object(he.a)({},e),{},{post:t.payload,error:""});case"GET_POST_FAILURE":return Object(he.a)(Object(he.a)({},e),{},{post:"",error:t.payload});case"DELETE_POST_SUCCESS":return Object(he.a)(Object(he.a)({},e),{},{posts:e.posts.filter((function(e){return e!=t.payload})),otherUser:e.otherUser?Object(he.a)(Object(he.a)({},e.otherUser),{},{posts:e.otherUser.posts.filter((function(e){return e!=t.payload}))}):"",error:""});case"DELETE_POST_FAILURE":return Object(he.a)(Object(he.a)({},e),{},{error:t.payload});case"ADD_COMMENT_SUCCESS":var a=e.posts.findIndex((function(e){return e._id===t.payload.postId}));return e.posts[a].commentCount++,console.log("inside add comment reducer"),Object(he.a)(Object(he.a)({},e),{},{post:Object(he.a)(Object(he.a)({},e.post),{},{data:Object(he.a)(Object(he.a)({},e.post.data),{},{comments:[t.payload].concat(Object(N.a)(e.post.data.comments))})})});case"ADD_COMMENT_FAILURE":return Object(he.a)(Object(he.a)({},e),{},{loadingPost:!1,error:t.payload});case"LIKE_POST_SUCCESS":var n=e.posts.findIndex((function(e){return e._id===t.payload.postId}));return e.posts[n].likeCount++,Object(he.a)({},e);case"UNLIKE_POST_SUCCESS":var o=e.posts.findIndex((function(e){return e._id===t.payload.postId}));return e.posts[o].likeCount--,Object(he.a)({},e);case"GET_OTHER_USER_SUCCESS":return Object(he.a)(Object(he.a)({},e),{},{loadingPost:!1,otherUser:t.payload});case"GET_OTHER_USER_FAILURE":return Object(he.a)(Object(he.a)({},e),{},{loadingPost:!1,error:t.payload});default:return e}},fe={loading:!0,currentUser:"",notifications:"",likes:"",error:""},ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOADING_REQUEST":return Object(he.a)(Object(he.a)({},e),{},{loading:!0});case"GET_CURRENTUSER_SUCCESS":return{loading:!1,currentUser:t.payload.data,likes:Object(N.a)(t.payload.data.likes),error:""};case"GET_CURRENTUSER_FAILURE":return{loading:!1,currentUser:"",likes:"",error:t.payload};case"LIKE_POST_SUCCESS":return Object(he.a)(Object(he.a)({},e),{},{likes:[].concat(Object(N.a)(e.likes),[t.payload]),loading:!1});case"UNLIKE_POST_SUCCESS":var a=e.likes.filter((function(e){return e.postId!=t.payload.postId}));return console.log(a),Object(he.a)(Object(he.a)({},e),{},{likes:Object(N.a)(a),loading:!1});case"LIKE_POST_FAILURE":return Object(he.a)(Object(he.a)({},e),{},{likes:"",loading:!1});case"GET_UPDATEDUSER_SUCCESS":return Object(he.a)(Object(he.a)({},e),{},{loading:!1,currentUser:t.payload.data,error:""});case"GET_UPDATEDUSER_FAILURE":return Object(he.a)(Object(he.a)({},e),{},{loading:!1,currentUser:"",error:t.payload});case"LOG_OUT_SUCCESS":return{loading:!1,currentUser:"",notifications:"",likes:"",error:""};case"LOG_OUT_FAILURE":return{loading:!1,currentUser:"",notifications:"",likes:"",error:t.payload};case"GET_NOTEREAD_SUCCESS":var n=e.currentUser.notifications.filter((function(e){return e._id!=t.payload._id}));return Object(he.a)(Object(he.a)({},e),{},{currentUser:Object(he.a)(Object(he.a)({},e.currentUser),{},{notifications:Object(N.a)(n)})});default:return e}},Se=Object(pe.combineReducers)({Data:be,Authenticate:ge}),ve=a(75),Ce=a(76),ye=a(153),Oe=a(77),we=a(78);ye.a.addDefaultLocale(Oe),ye.a.addLocale(we);var Ue=Object(pe.createStore)(Se,Object(Ce.composeWithDevTools)(Object(pe.applyMiddleware)(ve.a)));l.a.render(o.a.createElement(E.a,{store:Ue},o.a.createElement(de,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},85:function(e,t,a){e.exports=a(117)},90:function(e,t,a){},91:function(e,t,a){}},[[85,1,2]]]);
//# sourceMappingURL=main.143e3aea.chunk.js.map