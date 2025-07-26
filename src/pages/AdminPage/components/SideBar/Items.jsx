import profile from "../../../../assets/imgs/vector/aside__icons/profile.svg?react";
import calendar from "../../../../assets/imgs/vector/aside__icons/calendar.svg?react";
import groups from "../../../../assets/imgs/vector/aside__icons/groups.svg?react";
import lessons from "../../../../assets/imgs/vector/aside__icons/lessons.svg?react";
import articles from "../../../../assets/imgs/vector/aside__icons/articles.svg?react";
import appeals from "../../../../assets/imgs/vector/aside__icons/appeals.svg?react";

export const Items = [
    {
        id: 1,
        category: "Меню",
        menu__items: [
            {
                id: 1,
                icon: profile,
                text: "Профиль",
                page: "profile"
            },
            {
                id: 2,
                icon: calendar,
                text: "Календарь",
                page: "calendar"
            },
            {
                id: 3,
                icon: groups,
                text: "Группы",
                page: "groups"
            },
            {
                id: 4,
                icon: lessons,
                text: "Занятия",
                page: "lessons"
            },
            {
                id: 5,
                icon: articles,
                text: "Статьи",
                page: "articles"
            },
            {
                id: 6,
                icon: appeals,
                text: "Обращения",
                page: "appeals"
            },
        ]
    }
];