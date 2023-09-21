import Toggle from '@atlaskit/toggle';
import { EditorDefinition, ChartNode } from '@ironclad/rivet-core';
import clsx from 'clsx';
import { FC } from 'react';
import { match } from 'ts-pattern';
import { SharedEditorProps } from './SharedEditorProps';
import { DefaultAnyDataEditor } from './AnyEditor';
import { DefaultCodeEditor } from './CodeEditor';
import { DefaultColorEditor } from './ColorEditor';
import { DefaultDataTypeSelector } from './DataTypeEditor';
import { DefaultDatasetSelectorEditor } from './DatasetSelectorEditor';
import { DefaultDropdownEditor } from './DropdownEditor';
import { DefaultFileBrowserEditor } from './FileBrowserEditor';
import { DefaultGraphSelectorEditor } from './GraphSelectorEditor';
import { DefaultImageBrowserEditor } from './ImageBrowserEditor';
import { DefaultNumberEditor } from './NumberEditor';
import { DefaultStringEditor } from './StringEditor';
import { DefaultToggleEditor } from './ToggleEditor';
import { EditorGroup } from './EditorGroup';
import { KeyValuePairEditor } from './KeyValuePairEditor';
import { StringListEditor } from './StringListEditor';

export const DefaultNodeEditorField: FC<
  SharedEditorProps & {
    editor: EditorDefinition<ChartNode>;
  }
> = ({ node, onChange, editor, isReadonly, isDisabled, onClose }) => {
  const data = node.data as Record<string, unknown>;

  if (editor.hideIf?.(node.data)) {
    return null;
  }

  const sharedProps: SharedEditorProps = {
    node,
    onChange,
    isReadonly,
    onClose,
    isDisabled,
  };

  const input = match(editor)
    .with({ type: 'string' }, (editor) => <DefaultStringEditor {...sharedProps} editor={editor} />)
    .with({ type: 'toggle' }, (editor) => <DefaultToggleEditor {...sharedProps} editor={editor} />)
    .with({ type: 'dataTypeSelector' }, (editor) => <DefaultDataTypeSelector {...sharedProps} editor={editor} />)
    .with({ type: 'anyData' }, (editor) => <DefaultAnyDataEditor {...sharedProps} editor={editor} />)
    .with({ type: 'dropdown' }, (editor) => <DefaultDropdownEditor {...sharedProps} editor={editor} />)
    .with({ type: 'number' }, (editor) => <DefaultNumberEditor {...sharedProps} editor={editor} />)
    .with({ type: 'code' }, (editor) => <DefaultCodeEditor {...sharedProps} editor={editor} />)
    .with({ type: 'graphSelector' }, (editor) => <DefaultGraphSelectorEditor {...sharedProps} editor={editor} />)
    .with({ type: 'datasetSelector' }, (editor) => <DefaultDatasetSelectorEditor {...sharedProps} editor={editor} />)
    .with({ type: 'color' }, (editor) => <DefaultColorEditor {...sharedProps} editor={editor} />)
    .with({ type: 'fileBrowser' }, (editor) => <DefaultFileBrowserEditor {...sharedProps} editor={editor} />)
    .with({ type: 'imageBrowser' }, (editor) => <DefaultImageBrowserEditor {...sharedProps} editor={editor} />)
    .with({ type: 'group' }, (editor) => <EditorGroup {...sharedProps} editor={editor} />)
    .with({ type: 'keyValuePair' }, (editor) => <KeyValuePairEditor {...sharedProps} editor={editor} />)
    .with({ type: 'stringList' }, (editor) => <StringListEditor {...sharedProps} editor={editor} />)
    .exhaustive();

  const toggle =
    editor.type !== 'group' && editor.useInputToggleDataKey ? (
      <div className="use-input-toggle">
        <Toggle
          isChecked={data[editor.useInputToggleDataKey] as boolean | undefined}
          isDisabled={isReadonly || sharedProps.isDisabled}
          onChange={(e) =>
            onChange({
              ...node,
              data: {
                ...data,
                [editor.useInputToggleDataKey!]: e.target.checked,
              },
            })
          }
        />
      </div>
    ) : (
      <div />
    );

  return (
    <div className={clsx('row', editor.type)}>
      {input}
      {toggle}
    </div>
  );
};
