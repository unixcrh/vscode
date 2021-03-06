/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import {onUnexpectedError} from 'vs/base/common/errors';
import URI from 'vs/base/common/uri';
import {IAction, Action} from 'vs/base/common/actions';
import {TPromise} from 'vs/base/common/winjs.base';
import {IModel, IRange, IPosition} from 'vs/editor/common/editorCommon';
import {Range} from 'vs/editor/common/core/range';
import {ICodeLensSupport, ICodeLensSymbol, ICommand} from 'vs/editor/common/modes';
import LanguageFeatureRegistry from 'vs/editor/common/modes/languageFeatureRegistry';

export const CodeLensRegistry = new LanguageFeatureRegistry<ICodeLensSupport>('codeLensSupport');

export interface ICodeLensData {
	symbol: ICodeLensSymbol;
	support: ICodeLensSupport;
}

export function getCodeLensData(model: IModel) {

	const symbols: ICodeLensData[] = [];
	const promises = CodeLensRegistry.all(model).map(support => {
		return support.findCodeLensSymbols(model.getAssociatedResource()).then(result => {
			if (!Array.isArray(result)) {
				return;
			}
			for (let symbol of result) {
				symbols.push({ symbol, support });
			}
		}, err => {
			onUnexpectedError(err);
		});
	});

	return TPromise.join(promises).then(() => symbols);
}