import {
	Box,
	Flex,
	HStack,
	Text,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useDisclosure,
	useColorModeValue,
	Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Link from 'next/link'

const Links = [
	{ name: 'All Entries', path: '/submissions' },
	{ name: 'New Entry', path: '/' },
]

const NavLink = ({ name, path }: { name: string; path: string }) => (
	<Link href={path} passHref>
		<Text
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
		>
			{name}
		</Text>
	</Link>
)

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const bg = useColorModeValue('white', 'gray.800')

	return (
		<>
			<Box bg={bg} px={4} boxShadow={'lg'}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton
						size={'md'}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
						variant='outline'
					/>
					<HStack spacing={8} alignItems={'center'}>
						<Box fontSize={'2xl'} fontWeight={'bold'} letterSpacing={'tighter'}>
							Cognitive Journaling
						</Box>
						<HStack
							as={'nav'}
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
							fontSize={'sm'}
						>
							{Links.map((link) => (
								<NavLink key={link.name} name={link.name} path={link.path} />
							))}
						</HStack>
					</HStack>
					<Flex alignItems={'center'}>
						<Menu>
							{/* <MenuButton
								as={Button}
								rounded={'full'}
								variant={'link'}
								cursor={'pointer'}
								minW={0}
								variant='outline'
							></MenuButton> */}
							<MenuList>
								<MenuItem>Link 1</MenuItem>
								<MenuItem>Link 2</MenuItem>
								<MenuItem>Link 3</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							{Links.map((link) => (
								<NavLink key={link.name} name={link.name} path={link.path} />
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	)
}
