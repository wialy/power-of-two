import { ComponentProps } from 'react';

import { Entity } from '../../../engine/types/entities';
import { EntityView } from '../../../ui/components/entity-view';
import { Stepper } from '../../../ui/components/stepper';
import { TILE_SIZE } from '../../../ui/constants';
import { EditorOption } from '../editor-option';

type StepperProperties = ComponentProps<typeof Stepper>;

export const EditorEntityStepper = ({
	entity,
	initialValue,
	onValueChange,
}: { entity: Entity } & Pick<
	StepperProperties,
	'onValueChange' | 'initialValue'
>) => (
	<EditorOption
		control={
			<Stepper
				initialValue={initialValue}
				onValueChange={onValueChange}
			/>
		}
		icon={
			<EntityView
				entity={entity}
				scale={32 / TILE_SIZE}
			/>
		}
	/>
);
