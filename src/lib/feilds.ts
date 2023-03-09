export const selectPage = {
  id: true,
  emoji: {
    select: {
      id: true,
      image: true,
    },
  },
  pageConfig: {
    select: {
      title: true,
      favorite: true,
      editable: true,
      shouldShow: true,
      droppable: true,
    },
  },

  parentId: true,
}

export const createPage = {
  emoji: {
    create: {},
  },
  cover: {
    create: {},
  },
  content: {
    create: {
      paragraph: {
        create: {
          children: {
            create: {},
          },
        },
      },
    },
  },
  children: {},
}

export const updatePageContent = {
  data: {
    content: {
      delete: true,
      create: {},
    },
  },
  select: {
    content: {
      select: {
        id: true,
      },
    },
  },
}
