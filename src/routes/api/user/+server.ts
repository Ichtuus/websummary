import { json, RequestEvent } from '@sveltejs/kit';
import prisma from '$lib/prisma';


export const GET = async (event: RequestEvent) => {
  const { id_token } = event.params; // Récupère l'id de l'utilisateur depuis l'URL

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id_token), // Convertir l'id en entier
      },
      include: {
        summaries: true, 
      },
    });

    if (!user) {
      return json({ error: 'User not found' }, { status: 404 });
    }

    return json({ user });
  } catch (error) {
    return json({ error: 'An error occurred while fetching the user.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};