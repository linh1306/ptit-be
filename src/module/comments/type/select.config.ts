const select = {
  findByPost: {
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  },
};
export default select;
