import {
	Entity,
	isDice,
	isFloor,
	isMovable,
} from '../../../engine/types/entities';
import { Stepper } from '../../../ui/components/stepper';
import { ENTITIES } from '../../constants';
import { useEditorContext } from '../../contexts/editor-context';
import { EditorEntityStepper } from '../editor-entity-stepper';
import { EditorOption } from '../editor-option';
import $$ from './entities-sidebar.module.css';

const getIsSameEntity = (a: Entity, b: Entity) => {
	if (isFloor(a) && isFloor(b)) {
		return a.target === b.target && a.direction === b.direction;
	}

	if (isDice(a) && isDice(b)) {
		return a.value === b.value;
	}

	if (isMovable(a) && isMovable(b)) {
		return a.type === b.type;
	}

	return false;
};

export const EntitiesSidebar = () => {
	const { entities, seed, setEntities, setSeed } = useEditorContext();

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const handleValueChange = (entity: Entity) => (value: number) => {
		setEntities(
			entities.map((record) =>
				getIsSameEntity(record.entity, entity)
					? { ...record, quantity: value }
					: record,
			),
		);
	};

	return (
		<aside className={$$.container}>
			<EditorOption
				control={
					<Stepper
						initialValue={seed}
						onValueChange={setSeed}
					/>
				}
				icon={<div style={{ transform: 'translate(-50%, -50%)' }}>🎲</div>}
			/>
			{ENTITIES.map((entity, index) => (
				<EditorEntityStepper
					key={index}
					entity={entity}
					initialValue={0}
					onValueChange={handleValueChange(entity)}
				/>
			))}
		</aside>
	);
};
