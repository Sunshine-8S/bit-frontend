import { Routes } from '@angular/router';
import { Ahorros } from './components/pages/ahorros/ahorros';
import { Gastos } from './components/pages/gastos/gastos';
import { Ingresar } from './components/pages/ingresar/ingresar';
import { Registrarse } from './components/pages/registrarse/registrarse';
import { PageNotFound } from './components/pages/page-not-found/page-not-found';

export const routes: Routes = [
    {
        path: "gastos",
        component: Gastos,
        title: "Gastos"
    },
    {
        path: "ahorros",
        component: Ahorros,
        title: "Ahorros"
    },
    {
        path: "ingresar",
        component: Ingresar,
        title: "Ingresar"
    },
    {
        path: "registrarse",
        component: Registrarse,
        title: "Registrarse"
    },
    {
        path: "",
        redirectTo: "/ahorros",
        pathMatch: "full"
    },
    {
        path: "**",
        component: PageNotFound,
        title: "Error 404"
    }
];
