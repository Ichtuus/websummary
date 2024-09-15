import { prisma } from '$lib/prisma';
import { type User } from '@prisma/client';

export class UserService {
	public async getUser({ email }) {
		// try {
		const user = await prisma.user.findUnique({
			where: email
		});
		return user;
		// } catch (error) {
		// 	throw new Error('An error occured on search user');
		// }
	}

	public async addUser(
		user: Omit<User, 'id' | 'createdAt' | 'summaries' | 'access_token' | 'id_token' | 'role'>,
		tokens: any
	) {
		try {
			await prisma.user.create({
				data: {
					name: user.name as string,
					email: user.email as string,
					access_token: tokens.access_token as string,
					id_token: tokens.id_token as string
				}
			});
			return true;
		} catch (error) {
			throw new Error('An error occured on create user');
		}
	}

	public async updateUser(
		user: Omit<User, 'id' | 'createdAt' | 'summaries' | 'access_token' | 'id_token' | 'role'>,
		tokens: any
	) {
		try {
			await prisma.user.update({
				where: {
					email: user.email
				},
				data: {
					access_token: tokens.access_token as string,
					id_token: tokens.id_token as string
				}
			});
			return true;
		} catch (error) {
			throw new Error('An error occured on update user');
		}
	}

	public async checkAndUpdateUserCalls(email: string): Promise<boolean> {
		const user = await prisma.user.findUnique({
			where: { email },
			select: { totalCalls: true, role: true }
		});

		if (!user) return false;

		if (user.role === 'USER' && user.totalCalls <= 0) {
			return false;
		}

		if (user.role === 'USER') {
			await prisma.user.update({
				where: { email },
				data: { totalCalls: user.totalCalls - 1 }
			});
		}

		return true;
	}
}
