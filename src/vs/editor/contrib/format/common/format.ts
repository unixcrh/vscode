/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import {IFormattingSupport} from 'vs/editor/common/modes';
import LanguageFeatureRegistry from 'vs/editor/common/modes/languageFeatureRegistry';

export const FormatRegistry = new LanguageFeatureRegistry<IFormattingSupport>('formattingSupport');
export const FormatOnTypeRegistry = new LanguageFeatureRegistry<IFormattingSupport>('formattingSupport');

export {IFormattingSupport};