import { createContext, ReactNode, useContext } from 'react';
import { useDebounce } from 'use-debounce';

const screenContext = createContext<{
	isVisible: boolean;
	isFullyVisible: boolean;
	isFullyHidden: boolean;
}>({
	isFullyHidden: false,
	isFullyVisible: false,
	isVisible: false,
});

export const useScreen = () => useContext(screenContext);

export const ScreenProvider = ({
	children,
	delay = 1000,
	isVisible,
}: {
	children: ReactNode;
	isVisible: boolean;
	delay?: number;
}) => {
	const [isFullyHidden] = useDebounce(!isVisible, isVisible ? 0 : delay);
	const [isFullyVisible] = useDebounce(isVisible, isVisible ? delay : 0);

	return (
		<screenContext.Provider
			value={{
				isFullyHidden,
				isFullyVisible,
				isVisible,
			}}
		>
			{children}
		</screenContext.Provider>
	);
};
