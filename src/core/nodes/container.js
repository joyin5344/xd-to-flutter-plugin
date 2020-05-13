/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const NodeUtils = require("../nodeutils");
const PropType = require("../proptype");

const serialize = require("../serialize");
const { Parameter, ParameterRef } = require("../parameter");

class Container {
	constructor(xdNode) {
		this.xdNode = xdNode;
		this.children = [];
		this.parameters = {};

		let tapCbParam = new Parameter(this, "Function", "onTap", null);
		this.parameters["onTap"] = new ParameterRef(
			tapCbParam, true, NodeUtils.getProp(this.xdNode, PropType.TAP_CALLBACK_NAME));
	}

	toString(serializer, ctx) {
		if (!this.children.length)
			return "";

		let str = "Stack(children: <Widget>[";
		str += serialize.getChildListString(this.children, serializer, ctx);
		if (this.parameters["onTap"].exportName) {
			let lx = this.xdNode.localBounds.x;
			let ly = this.xdNode.localBounds.y;
			let tapParam = this.parameters["onTap"];
			let gdStr = serialize.getSizedGestureDetectorString(
				this.xdNode, serializer, ctx, tapParam.name, tapParam.isOwn);
			if (gdStr)
				str += `Transform.translate(offset: Offset(${lx}, ${ly}), child: ${gdStr}, ),`;
		}
		str += "],)";

		return str;
	}

}

exports.Container = Container;
