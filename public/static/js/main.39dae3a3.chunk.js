(this.webpackJsonppresentation=this.webpackJsonppresentation||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(5),i=n.n(c),u=(n(12),n(2)),o=(n(13),function(e){var t=e.refresh,n=e.myEvent,c=e.id,i="",o="",l="",s="",d="Appointment";if(n){i=n.name,o=n.desc,l=n.date.slice(0,10);var m=new Date(n.date),v=m.getHours(),h=m.getMinutes();v<10&&(v="0"+v),h<10&&(h="0"+h),s=v+":"+h,d=n.type}var p,f,E=Object(a.useState)(i),g=Object(u.a)(E,2),b=g[0],y=g[1],j=Object(a.useState)(o),D=Object(u.a)(j,2),O=D[0],w=D[1],S=Object(a.useState)(l),k=Object(u.a)(S,2),C=k[0],M=k[1],I=Object(a.useState)(s),N=Object(u.a)(I,2),A=N[0],F=N[1],_=Object(a.useState)(d),T=Object(u.a)(_,2),P=T[0],B=T[1];return n?(p=r.a.createElement("input",{key:"Edit",value:"Edit Event",type:"submit"}),f=r.a.createElement("button",{type:"button",key:"cancel",onClick:function(){return t()}},"Cancel Edit")):p=r.a.createElement("input",{key:"Add",value:"Add Event",type:"submit"}),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=new Date(C);if(a.setDate(a.getDate()+1),a.setHours(A.slice(0,2)),a.setMinutes(A.slice(3,5)),n){var r={name:b,desc:O,date:a,type:P,archived:!1};fetch("".concat("","/api/scheduler/").concat(c),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(){return y("")})).then((function(){return w("")})).then((function(){return M("")})).then((function(){return F("")})).then((function(){return B("")})).then((function(){return t()}))}else{var i={name:b,desc:O,date:a,type:P,archived:!1};fetch("".concat("","/api/scheduler"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then((function(){return y("")})).then((function(){return w("")})).then((function(){return M("")})).then((function(){return F("")})).then((function(){return B("")})).then((function(){return t()}))}}},r.a.createElement("input",{placeholder:"Event Name",value:b,type:"text",onChange:function(e){var t=e.target;return y(t.value)},required:!0}),r.a.createElement("textarea",{placeholder:"Event Description",value:O,type:"text",onChange:function(e){var t=e.target;return w(t.value)}}),r.a.createElement("label",{htmlFor:"date"},"Event Date:"),r.a.createElement("input",{value:C,id:"date",type:"date",onChange:function(e){var t=e.target;return M(t.value)},required:!0}),r.a.createElement("label",{htmlFor:"date"},"Event Time:"),r.a.createElement("input",{value:A,id:"time",type:"time",onChange:function(e){var t=e.target;return F(t.value)},required:!0}),r.a.createElement("label",{htmlFor:"type"},"Event Type:"),r.a.createElement("select",{value:P,id:"type",onChange:function(e){var t=e.target;return B(t.value)}},r.a.createElement("option",{value:"Appointment"},"Appointment"),r.a.createElement("option",{value:"Meeting"},"Meeting"),r.a.createElement("option",{value:"Reminder"},"Reminder")),p,f)}),l=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(!1),l=Object(u.a)(i,2),s=l[0],d=l[1],m=Object(a.useState)(""),v=Object(u.a)(m,2),h=v[0],p=v[1];Object(a.useEffect)((function(){E()}),[]);var f,E=function(){fetch("".concat("","/api/scheduler")).then((function(e){return e.json()})).then((function(e){return c(e)})).then(d(!1)).then(p(""))},g=n.map((function(e){var t=new Date(e.date),n="AM",a=t.getHours();parseInt(a)>=12&&(n="PM"),parseInt(a)>12&&(a=parseInt(a)-12),0==parseInt(a)&&(a=parseInt(a)+12);var c,i=t.getMinutes();return parseInt(i)<10&&(i="0".concat(i)),t<Date.now()&&(c="Past Event: "),r.a.createElement("div",{key:e._id,className:"event"},r.a.createElement("h3",null,c,e.name,"- ",t.toDateString()," at ",a,":",i,n),r.a.createElement("button",{onClick:function(){return p(e),void d(!0)}},"Edit"),r.a.createElement("button",{onClick:function(){return t=e._id,void fetch("".concat("","/api/scheduler/").concat(t),{method:"DELETE"}).then((function(e){return e.json()})).then(E);var t}},"Delete"),r.a.createElement("p",null,e.type,". ",e.desc))}));return f=s?r.a.createElement(o,{key:h._id,isUpdate:s,refresh:E,myEvent:h,id:h._id}):r.a.createElement(o,{key:"Create",isUpdate:s,refresh:E}),r.a.createElement("div",{className:"listview"},f,g)},s=n(6),d=(n(14),function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(!1),l=Object(u.a)(i,2),d=l[0],m=l[1],v=Object(a.useState)(""),h=Object(u.a)(v,2),p=h[0],f=h[1],E=Object(a.useState)(""),g=Object(u.a)(E,2),b=g[0],y=g[1];Object(a.useEffect)((function(){D()}),[]);var j,D=function(){fetch("".concat("","/api/scheduler")).then((function(e){return e.json()})).then((function(e){return c(e)})).then(m(!1)).then(f(""))};if(b){var O=new Date(b),w=n.filter((function(e){var t=new Date(e.date);return t.getFullYear()==O.getFullYear()&&t.getMonth()==O.getMonth()&&t.getDate()==O.getDate()}));j=w.map((function(e){var t=new Date(e.date),n="AM",a=t.getHours();parseInt(a)>=12&&(n="PM"),parseInt(a)>12&&(a=parseInt(a)-12),0==parseInt(a)&&(a=parseInt(a)+12);var c,i=t.getMinutes();return parseInt(i)<10&&(i="0".concat(i)),t<Date.now()&&(c="Past Event: "),r.a.createElement("div",{key:e._id},r.a.createElement("h4",null,c,e.name," at ",a,":",i,n),r.a.createElement("button",{className:"myButton",onClick:function(){return f(e),void m(!0)}},"Edit"),r.a.createElement("button",{className:"myButton",onClick:function(){return t=e._id,void fetch("".concat("","/api/scheduler/").concat(t),{method:"DELETE"}).then((function(e){return e.json()})).then(D);var t}},"Delete"),r.a.createElement("p",null,e.type,". ",e.desc))})),0==w.length&&(j=r.a.createElement("div",{key:"empty"},"No events for this date"))}else j=r.a.createElement("div",{key:"nodate"},"Select a date for its event content");var S;return S=d?r.a.createElement(o,{key:p._id,isUpdate:d,refresh:D,myEvent:p,id:p._id}):r.a.createElement(o,{key:"Create",isUpdate:d,refresh:D}),r.a.createElement("div",{className:"calview"},r.a.createElement(s.a,{tileContent:function(e){var t=e.date,a=(e.view,new Date(t));return n.filter((function(e){var t=new Date(e.date);return t.getFullYear()==a.getFullYear()&&t.getMonth()==a.getMonth()&&t.getDate()==a.getDate()})).map((function(e){var t=new Date(e.date),n="AM",a=t.getHours();parseInt(a)>=12&&(n="PM"),parseInt(a)>12&&(a=parseInt(a)-12),0==parseInt(a)&&(a=parseInt(a)+12);var c=t.getMinutes();return parseInt(c)<10&&(c="0".concat(c)),r.a.createElement("div",{key:e._id,className:"Event"},a,":",c,n)}))},onClickDay:function(e,t){y(new Date(e))},className:"myCalendar",tileClassName:function(e){var t=e.date,a=(e.view,new Date(t));return n.filter((function(e){var t=new Date(e.date);return t.getFullYear()==a.getFullYear()&&t.getMonth()==a.getMonth()&&t.getDate()==a.getDate()})).length?"EventDays":null}}),S,r.a.createElement("h3",null,"Events for Selected Date ",b.toString().slice(0,15)),j)}),m=function(){var e,t,n=Object(a.useState)(!0),c=Object(u.a)(n,2),i=c[0],o=c[1];return i?(t=r.a.createElement(d,null),e=r.a.createElement("button",{className:"myButton",onClick:function(){return o(!1)}},"Switch to List View")):(t=r.a.createElement(l,null),e=r.a.createElement("button",{className:"myButton",onClick:function(){return o(!0)}},"Switch to Calendar View")),r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Event Scheduler"),e,t)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(m,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,n){e.exports=n(17)}},[[7,1,2]]]);
//# sourceMappingURL=main.39dae3a3.chunk.js.map