import { flatten } from "flat";
import _transform from "lodash.transform";
import _isEqual from "lodash.isequal";
import _isObject from "lodash.isobject";

function difference(object: any, base: any) {
	function changes(object: any, base: any) {
		return _transform(object, function(result: any, value: any, key: string) {
			if (!_isEqual(value, base[key])) {
				result[key] = (_isObject(value) && _isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
}

export function getFlattenDiff(newObject: any, oldObject: any) {
    return flatten(difference(newObject, oldObject));
}