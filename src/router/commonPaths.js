export default [
  {
    path: "/",
    meta: { layout: "default", guest: true, noScroll: true },
    name: "login",
    component: () => import("@/pages/login.vue"),
  },

  {
    path: "/home",
    meta: { layout: "default", noScroll: true, renderNavBar: true },
    name: "home",
    component: () => import("@/pages/home.vue"),
  },

  {
    path: "/inventory",
    meta: { layout: "default", noScroll: true, renderNavBar: true },
    name: "inventory",
    component: () => import("@/pages/inventory.vue"),
  },

  {
    path: "/product/:cardId",
    name: "product",
    meta: { layout: "default", renderNavBar: true },
    component: () => import("@/pages/product.vue"),
  },
  
  {
    path: "/sales",
    meta: { layout: "default", noScroll: true, renderNavBar: true },
    name: "sales",
    component: () => import("@/pages/sales.vue"),
  },

  {
    path: "/tables",
    meta: { layout: "default", noScroll: true, renderNavBar: true },
    name: "tables",
    component: () => import("@/pages/tables.vue"),
  },

  {
    path: "/staff",
    meta: { layout: "default", noScroll: true, renderNavBar: true },
    name: "staff",
    component: () => import("@/pages/staff.vue"),
  },

  {
    path: "/404",
    name: "AccessDenied",
    meta: { layout: "default", guest: true, noScroll: true },
    component: () => import("@/pages/Deny.vue"),
  },
];
