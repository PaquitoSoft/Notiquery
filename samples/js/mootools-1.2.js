//MooTools, <http://mootools.net>, My Object Oriented (JavaScript) Tools. Copyright (c) 2006-2008 Valerio Proietti, <http://mad4milk.net>, MIT Style License.
var MooTools={version:"1.2.1",build:"0d4845aab3d9a4fdee2f0d4a6dd59210e4b697cf"};var Native=function(K){K=K||{};var A=K.name;var I=K.legacy;var B=K.protect;
var C=K.implement;var H=K.generics;var F=K.initialize;var G=K.afterImplement||function(){};var D=F||I;H=H!==false;D.constructor=Native;D.$family={name:"native"};
if(I&&F){D.prototype=I.prototype;}D.prototype.constructor=D;if(A){var E=A.toLowerCase();D.prototype.$family={name:E};Native.typize(D,E);}var J=function(N,L,O,M){if(!B||M||!N.prototype[L]){N.prototype[L]=O;
}if(H){Native.genericize(N,L,B);}G.call(N,L,O);return N;};D.alias=function(N,L,O){if(typeof N=="string"){if((N=this.prototype[N])){return J(this,L,N,O);
}}for(var M in N){this.alias(M,N[M],L);}return this;};D.implement=function(M,L,O){if(typeof M=="string"){return J(this,M,L,O);}for(var N in M){J(this,N,M[N],L);
}return this;};if(C){D.implement(C);}return D;};Native.genericize=function(B,C,A){if((!A||!B[C])&&typeof B.prototype[C]=="function"){B[C]=function(){var D=Array.prototype.slice.call(arguments);
return B.prototype[C].apply(D.shift(),D);};}};Native.implement=function(D,C){for(var B=0,A=D.length;B<A;B++){D[B].implement(C);}};Native.typize=function(A,B){if(!A.type){A.type=function(C){return($type(C)===B);
};}};(function(){var A={Array:Array,Date:Date,Function:Function,Number:Number,RegExp:RegExp,String:String};for(var G in A){new Native({name:G,initialize:A[G],protect:true});
}var D={"boolean":Boolean,"native":Native,object:Object};for(var C in D){Native.typize(D[C],C);}var F={Array:["concat","indexOf","join","lastIndexOf","pop","push","reverse","shift","slice","sort","splice","toString","unshift","valueOf"],String:["charAt","charCodeAt","concat","indexOf","lastIndexOf","match","replace","search","slice","split","substr","substring","toLowerCase","toUpperCase","valueOf"]};
for(var E in F){for(var B=F[E].length;B--;){Native.genericize(window[E],F[E][B],true);}}})();var Hash=new Native({name:"Hash",initialize:function(A){if($type(A)=="hash"){A=$unlink(A.getClean());
}for(var B in A){this[B]=A[B];}return this;}});Hash.implement({forEach:function(B,C){for(var A in this){if(this.hasOwnProperty(A)){B.call(C,this[A],A,this);
}}},getClean:function(){var B={};for(var A in this){if(this.hasOwnProperty(A)){B[A]=this[A];}}return B;},getLength:function(){var B=0;for(var A in this){if(this.hasOwnProperty(A)){B++;
}}return B;}});Hash.alias("forEach","each");Array.implement({forEach:function(C,D){for(var B=0,A=this.length;B<A;B++){C.call(D,this[B],B,this);}}});Array.alias("forEach","each");
