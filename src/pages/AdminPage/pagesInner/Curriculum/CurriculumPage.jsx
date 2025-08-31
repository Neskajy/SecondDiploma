import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./CurriculumPage.module.scss";
import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import warning from "../../../../assets/imgs/vector/warning.svg";

export default function CurriculumPage() {
  const [curriculums] = useState([
    {
      id: 1,
      start_year: 2021,
      stop_year: 2023,
      groups: ["Группа А", "Группа Б"],
      courses: [
        {
          id: 1,
          name: "Математика",
          year: "2021-2022",
          semester: "1",
          hours: 60,
          themes: [
            { id: 1, title: "Основы алгебры", number: 1 },
            { id: 2, title: "Геометрия", number: 2 },
          ],
        },
      ],
    },
  ]);

  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const [isAddCurriculumOpen, setIsAddCurriculumOpen] = useState(false);
  const [isEditCurriculumOpen, setIsEditCurriculumOpen] = useState(false);
  const [isDeleteCurriculumOpen, setIsDeleteCurriculumOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [isDeleteCourseOpen, setIsDeleteCourseOpen] = useState(false);
  const [isAddThemeOpen, setIsAddThemeOpen] = useState(false);
  const [isEditThemeOpen, setIsEditThemeOpen] = useState(false);
  const [isDeleteThemeOpen, setIsDeleteThemeOpen] = useState(false);

  const {
    register: registerAddCurriculum,
    trigger: triggerAddCurriculum,
    reset: resetAddCurriculum,
    formState: { errors: errorsAddCurriculum },
  } = useForm({
    mode: "onBlur"
  });

  const {
    register: registerEditCurriculum,
    trigger: triggerEditCurriculum,
    reset: resetEditCurriculum,
    formState: { errors: errorsEditCurriculum },
  } = useForm({
    mode: "onBlur"
  });

  const {
    register: registerAddCourse,
    trigger: triggerAddCourse,
    reset: resetAddCourse,
    formState: { errors: errorsAddCourse },
  } = useForm({
    mode: "onBlur"
  });

  const {
    register: registerEditCourse,
    trigger: triggerEditCourse,
    reset: resetEditCourse,
    formState: { errors: errorsEditCourse },
  } = useForm({
    mode: "onBlur"
  });

  const {
    register: registerAddTheme,
    trigger: triggerAddTheme,
    reset: resetAddTheme,
    formState: { errors: errorsAddTheme },
  } = useForm({
    mode: "onBlur"
  });

  const {
    register: registerEditTheme,
    trigger: triggerEditTheme,
    reset: resetEditTheme,
    formState: { errors: errorsEditTheme },
  } = useForm({
    mode: "onBlur"
  });

  return (
    <div className={s.CurriculumPage}>
      <SideBar />
      <div className={s.HeaderAndContent}>
        <AdminHeader />
        <main className={s.main}>
          <div className={s.container}>
            <h5>Управление учебным планом</h5>
            <button className={s.addButton} onClick={() => setIsAddCurriculumOpen(true)}>
              Добавить учебный план
            </button>
            <div className={s.curriculumsList}>
              {curriculums.length === 0 ? (
                <p className={s.empty}>Учебные планы не найдены</p>
              ) : (
                curriculums.map((curriculum) => (
                  <div key={curriculum.id} className={s.curriculumCard}>
                    <h6>
                      {curriculum.start_year} - {curriculum.stop_year}
                    </h6>
                    <p className={s.description}>
                      Группы: {curriculum.groups.join(", ") || "Нет групп"}
                    </p>
                    <div className={s.actions}>
                      <button
                        className={s.btnEdit}
                        onClick={() => setSelectedCurriculum(curriculum)}
                      >
                        Просмотреть дисциплины
                      </button>
                      <button
                        className={s.btnEdit}
                        onClick={() => setIsEditCurriculumOpen(true)}
                      >
                        Редактировать
                      </button>
                      <button
                        className={s.btnDelete}
                        onClick={() => setIsDeleteCurriculumOpen(true)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedCurriculum && (
              <div className={s.courseList}>
                <h6>
                  Дисциплины учебного плана {selectedCurriculum.start_year}–{selectedCurriculum.stop_year}
                </h6>
                <button className={s.addButton} onClick={() => setIsAddCourseOpen(true)}>
                  Добавить дисциплину
                </button>
                {selectedCurriculum.courses.length === 0 ? (
                  <p className={s.empty}>Дисциплины не найдены</p>
                ) : (
                  selectedCurriculum.courses.map((course) => (
                    <div key={course.id} className={s.courseCard}>
                      <h6>{course.name}</h6>
                      <p>
                        Год: {course.year}, Семестр: {course.semester}, Часов: {course.hours}
                      </p>
                      <div className={s.actions}>
                        <button
                          className={s.btnEdit}
                          onClick={() => setSelectedCourse(course)}
                        >
                          Просмотреть темы
                        </button>
                        <button
                          className={s.btnEdit}
                          onClick={() => setIsEditCourseOpen(true)}
                        >
                          Редактировать
                        </button>
                        <button
                          className={s.btnDelete}
                          onClick={() => setIsDeleteCourseOpen(true)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {selectedCourse && (
              <div className={s.themeList}>
                <h6>Темы дисциплины {selectedCourse.name}</h6>
                <button className={s.addButton} onClick={() => setIsAddThemeOpen(true)}>
                  Добавить тему
                </button>
                {selectedCourse.themes.length === 0 ? (
                  <p className={s.empty}>Темы не найдены</p>
                ) : (
                  selectedCourse.themes.map((theme) => (
                    <div key={theme.id} className={s.themeCard}>
                      <p>
                        {theme.number}. {theme.title}
                      </p>
                      <div className={s.actions}>
                        <button
                          className={s.btnEdit}
                          onClick={() => setIsEditThemeOpen(true)}
                        >
                          Редактировать
                        </button>
                        <button
                          className={s.btnDelete}
                          onClick={() => setIsDeleteThemeOpen(true)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <UniversalModal
        isOpen={isAddCurriculumOpen}
        onClose={() => {
          setIsAddCurriculumOpen(false);
          resetAddCurriculum();
        }}
        onApply={async () => {
          await triggerAddCurriculum(); 
        }}
        applyText="Сохранить"
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h5>Добавить учебный план</h5>
            <div className={modal_s.items}>
              <div className={modal_s.item}>
                <p>Год начала</p>
                <input
                  type="number"
                  placeholder="2021"
                  {...registerAddCurriculum("start_year", { required: "Обязательное поле" })}
                />
                {errorsAddCurriculum.start_year && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAddCurriculum.start_year.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Год завершения</p>
                <input
                  type="number"
                  placeholder="2023"
                  {...registerAddCurriculum("stop_year", { required: "Обязательное поле" })}
                />
                {errorsAddCurriculum.stop_year && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAddCurriculum.stop_year.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
      />

      <UniversalModal
        isOpen={isEditCurriculumOpen}
        onClose={() => {
          setIsEditCurriculumOpen(false);
          resetEditCurriculum();
        }}
        onApply={async () => {
          await triggerEditCurriculum();
        }}
        applyText="Сохранить"
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h5>Редактировать учебный план</h5>
            <div className={modal_s.items}>
              <div className={modal_s.item}>
                <p>Год начала</p>
                <input
                  type="number"
                  defaultValue={selectedCurriculum?.start_year}
                  {...registerEditCurriculum("start_year", { required: "Обязательное поле" })}
                />
                {errorsEditCurriculum.start_year && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEditCurriculum.start_year.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Год завершения</p>
                <input
                  type="number"
                  defaultValue={selectedCurriculum?.stop_year}
                  {...registerEditCurriculum("stop_year", { required: "Обязательное поле" })}
                />
                {errorsEditCurriculum.stop_year && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEditCurriculum.stop_year.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
      />

      <UniversalModal
        isOpen={isDeleteCurriculumOpen}
        onClose={() => setIsDeleteCurriculumOpen(false)}
        onApply={() => {
          console.log("Удаление заглушка — действие не выполнено");
        }}
        applyText="Удалить"
        applyClassName={s.btnDelete}
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h6>Подтвердите удаление</h6>
            <p>
              Вы действительно хотите удалить учебный план{" "}
              <strong>
                {selectedCurriculum?.start_year}–{selectedCurriculum?.stop_year}
              </strong>
              ?
            </p>
            <p style={{ color: "#E74C3C", marginTop: "10px" }}>
              Это действие нельзя отменить.
            </p>
          </section>
        }
      />

      <UniversalModal
        isOpen={isAddCourseOpen}
        onClose={() => {
          setIsAddCourseOpen(false);
          resetAddCourse();
        }}
        onApply={async () => {
          await triggerAddCourse();
        }}
        applyText="Сохранить"
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h5>Добавить дисциплину</h5>
            <div className={modal_s.items}>
              <div className={modal_s.item}>
                <p>Название</p>
                <input
                  type="text"
                  placeholder="Математика"
                  {...registerAddCourse("name", { required: "Обязательное поле" })}
                />
                {errorsAddCourse.name && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAddCourse.name.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Год</p>
                <input
                  type="text"
                  placeholder="2021-2022"
                  {...registerAddCourse("year", { required: "Обязательное поле" })}
                />
                {errorsAddCourse.year && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAddCourse.year.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Семестр</p>
                <select {...registerAddCourse("semester", { required: "Обязательное поле" })}>
                  <option value="">Выберите</option>
                  <option value="1">1 семестр</option>
                  <option value="2">2 семестр</option>
                </select>
                {errorsAddCourse.semester && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAddCourse.semester.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Часы</p>
                <input
                  type="number"
                  placeholder="60"
                  {...registerAddCourse("hours", { required: "Обязательное поле" })}
                />
                {errorsAddCourse.hours && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAddCourse.hours.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
      />

      <UniversalModal
        isOpen={isEditCourseOpen}
        onClose={() => {
          setIsEditCourseOpen(false);
          resetEditCourse();
        }}
        onApply={async () => {
          await triggerEditCourse();
        }}
        applyText="Сохранить"
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h5>Редактировать дисциплину</h5>
            <div className={modal_s.items}>
              <div className={modal_s.item}>
                <p>Название</p>
                <input
                  type="text"
                  defaultValue={selectedCourse?.name}
                  {...registerEditCourse("name", { required: "Обязательное поле" })}
                />
                {errorsEditCourse.name && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEditCourse.name.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Год</p>
                <input
                  type="text"
                  defaultValue={selectedCourse?.year}
                  {...registerEditCourse("year", { required: "Обязательное поле" })}
                />
                {errorsEditCourse.year && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEditCourse.year.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Семестр</p>
                <select
                  defaultValue={selectedCourse?.semester}
                  {...registerEditCourse("semester", { required: "Обязательное поле" })}
                >
                  <option value="1">1 семестр</option>
                  <option value="2">2 семестр</option>
                </select>
                {errorsEditCourse.semester && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEditCourse.semester.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Часы</p>
                <input
                  type="number"
                  defaultValue={selectedCourse?.hours}
                  {...registerEditCourse("hours", { required: "Обязательное поле" })}
                />
                {errorsEditCourse.hours && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEditCourse.hours.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
      />

      <UniversalModal
        isOpen={isDeleteCourseOpen}
        onClose={() => setIsDeleteCourseOpen(false)}
        onApply={() => {
          console.log("Удаление дисциплины — заглушка");
        }}
        applyText="Удалить"
        applyClassName={s.btnDelete}
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h6>Подтвердите удаление</h6>
            <p>
              Вы действительно хотите удалить дисциплину{" "}
              <strong>"{selectedCourse?.name}"</strong>?
            </p>
            <p style={{ color: "#E74C3C", marginTop: "10px" }}>
              Это действие нельзя отменить.
            </p>
          </section>
        }
      />

      <UniversalModal
        isOpen={isAddThemeOpen}
        onClose={() => {
          setIsAddThemeOpen(false);
          resetAddTheme();
        }}
        onApply={async () => {
          await triggerAddTheme();
        }}
        applyText="Сохранить"
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h5>Добавить тему</h5>
            <div className={modal_s.items}>
              <div className={modal_s.item}>
                <p>Название</p>
                <input
                  type="text"
                  placeholder="Основы алгебры"
                  {...registerAddTheme("title", { required: "Обязательное поле" })}
                />
                {errorsAddTheme.title && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAddTheme.title.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Порядковый номер</p>
                <input
                  type="number"
                  placeholder="1"
                  {...registerAddTheme("number", {
                    required: "Обязательное поле",
                    min: { value: 1, message: "Минимум 1" },
                  })}
                />
                {errorsAddTheme.number && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAddTheme.number.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
      />

      <UniversalModal
        isOpen={isEditThemeOpen}
        onClose={() => {
          setIsEditThemeOpen(false);
          resetEditTheme();
        }}
        onApply={async () => {
          await triggerEditTheme();
        }}
        applyText="Сохранить"
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h5>Редактировать тему</h5>
            <div className={modal_s.items}>
              <div className={modal_s.item}>
                <p>Название</p>
                <input
                  type="text"
                  defaultValue={selectedTheme?.title}
                  {...registerEditTheme("title", { required: "Обязательное поле" })}
                />
                {errorsEditTheme.title && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEditTheme.title.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Порядковый номер</p>
                <input
                  type="number"
                  defaultValue={selectedTheme?.number}
                  {...registerEditTheme("number", {
                    required: "Обязательное поле",
                    min: { value: 1, message: "Минимум 1" },
                  })}
                />
                {errorsEditTheme.number && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEditTheme.number.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
      />

      <UniversalModal
        isOpen={isDeleteThemeOpen}
        onClose={() => setIsDeleteThemeOpen(false)}
        onApply={() => {
          console.log("Удаление темы — заглушка");
        }}
        applyText="Удалить"
        applyClassName={s.btnDelete}
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h6>Подтвердите удаление</h6>
            <p>
              Вы действительно хотите удалить тему{" "}
              <strong>"{selectedTheme?.title}"</strong>?
            </p>
            <p style={{ color: "#E74C3C", marginTop: "10px" }}>
              Это действие нельзя отменить.
            </p>
          </section>
        }
      />
    </div>
  );
}