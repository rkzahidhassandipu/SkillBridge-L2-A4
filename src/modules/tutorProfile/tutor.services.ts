import { prisma } from "../../lib/prisma";

const createTutorProfile = async (
  userId: string,
  bio: string,
  pricePerHour: number,
  categoryIds: string[],
) => {
  const exists = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (exists) {
    throw new Error("Tutor profile already exists");
  }

  return await prisma.tutorProfile.create({
    data: {
      userId,
      bio,
      pricePerHour,
      categories: {
        create: categoryIds.map((id) => ({
          categoryId: id,
        })),
      },
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
};

const getTutorProfileByUserId = async (userId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!profile) {
    throw new Error("Tutor profile not found");
  }
  return profile;
};

const updateTutorProfile = async (
  userId: string,
  bio: string,
  pricePerHour: number,
  categoryIds?: string[],
) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
    include: {
      categories: true, // fetch existing categories
    },
  });

  if (!profile) {
    throw new Error("Tutor profile not found");
  }

  // filter out categoryIds that already exist
  const existingCategoryIds = profile.categories.map((c) => c.categoryId);
  const newCategoryIds = categoryIds?.filter((id) => !existingCategoryIds.includes(id));

  return await prisma.tutorProfile.update({
    where: { id: profile.id },
    data: {
      bio,
      pricePerHour,
      categories: newCategoryIds?.length
        ? {
            create: newCategoryIds.map((categoryId) => ({ categoryId })),
          }
        : undefined, // skip if no new categories
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
};



export const tutorProfileServices = {
  createTutorProfile,
  getTutorProfileByUserId,
  updateTutorProfile,
};
