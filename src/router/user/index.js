const userRouter = [
  {
    path: "cloudDiskIndex",
    name: "cloudDiskIndex",
    redirect: "/userHome/cloudDiskIndex/allFile",
    component: () => import("@/views/user/cloudDiskIndex.vue"),
    // meta: {
    //   requireAuth: true
    // }
    children: [
      {
        path: "allFile",
        name: "allFile",
        component: () => import("@/components/user/allFile.vue")
      },
      {
        path: "allFile/:path",
        name: "allFileDir",
        component: () => import("@/components/user/allFile.vue")
      },
      {
        path: "image",
        name: "image",
        component: () => import("@/components/user/image.vue")
      },

      {
        path: "music",
        name: "music",
        component: () => import("@/components/user/music.vue")
      },
      {
        path: "video",
        name: "video",
        component: () => import("@/components/user/video.vue")
      },
      {
        path: "doc",
        name: "doc",
        component: () => import("@/components/user/doc.vue")
      },
      {
        path: "other",
        name: "other",
        component: () => import("@/components/user/other.vue")
      },
      {
        path: "share",
        name: "share",
        component: () => import("@/components/user/share.vue")
      },

      {
        path: "recycleBin",
        name: "recycleBin",
        component: () => import("@/components/user/recycleBin.vue")
      },
      {
        path: "recycleBin/:path",
        name: "recycleBinDir",
        component: () => import("@/components/user/recycleBin.vue")
      },
      {
        path: "admin",
        name: "admin",
        component: () => import("@/components/user/admin.vue")
      }
    ]
  }
]
export default userRouter
