const visitorRouter = [
  {
    path: "cloudDiskIndex",
    name: "visitorCloudDiskIndex",
    redirect: "/visitorHome/cloudDiskIndex/allFile",
    component: () => import("@/views/visitor/cloudDiskIndex.vue"),
    // meta: {
    //   requireAuth: true
    // }
    children: [
      {
        path: "allFile",
        name: "visitorAllFile",
        component: () => import("@/components/visitor/allFile.vue")
      },
      {
        path: "image",
        name: "visitorImage",
        component: () => import("@/components/visitor/image.vue")
      },

      {
        path: "music",
        name: "visitorMusic",
        component: () => import("@/components/visitor/music.vue")
      },
      {
        path: "video",
        name: "visitorVideo",
        component: () => import("@/components/visitor/video.vue")
      },
      {
        path: "doc",
        name: "visitorDoc",
        component: () => import("@/components/visitor/doc.vue")
      },
      {
        path: "other",
        name: "visitorOther",
        component: () => import("@/components/visitor/other.vue")
      }
    ]
  }
]
export default visitorRouter
