import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ArticlesPage.module.scss";
import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import warning from "../../../../assets/imgs/vector/warning.svg";

export default function ArticlesPage() {
  const [articles] = useState([
    {
      id: 1,
      title: "Как стать успешным методистом",
      description: "Краткое описание статьи о карьерных возможностях...",
      image: "../../src/assets/imgs/raster/post.jpg",
      status: "опубликовано",
      author: "Анна Петрова",
    },
    {
      id: 2,
      title: "Новые методики преподавания",
      description: "Современные подходы к обучению в 2025 году...",
      image: "../../src/assets/imgs/raster/post.jpg",
      status: "черновик",
      author: "Иван Сидоров",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const {
    register: registerAdd,
    trigger: triggerAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm({
    mode: "onBlur"
  });

  const {
    register: registerEdit,
    trigger: triggerEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm({
    mode: "onBlur"
  });

  return (
    <div className={s.ArticlesPage} style={{ display: "flex" }}>
      <SideBar />
      <div className={s.HeaderAndContent} style={{ width: "100%" }}>
        <AdminHeader />
        <main className={s.main}>
          <div className={s.container}>
            <section className={s.section__articles}>
              <h5>Управление статьями</h5>
              <button className={s.addButton} onClick={() => setIsAddModalOpen(true)}>
                Добавить статью
              </button>
              <div className={s.articlesList}>
                {articles.length === 0 ? (
                  <p className={s.empty}>Статьи не найдены</p>
                ) : (
                  articles.map((article) => (
                    <div key={article.id} className={s.articleCard}>
                      <div className={s.imageWrapper}>
                        <img src={article.image} alt={article.title} />
                      </div>
                      <div className={s.content}>
                        <h6>{article.title}</h6>
                        <p className={s.description}>{article.description}</p>
                        <div className={s.meta}>
                          <span className={s.author}>Автор: {article.author}</span>
                          <span
                            className={`${s.status} ${
                              article.status === "опубликовано" ? s.published : s.draft
                            }`}
                          >
                            {article.status}
                          </span>
                        </div>
                      </div>
                      <div className={s.actions}>
                        <button
                          className={s.btnEdit}
                          onClick={() => {
                            setSelectedArticle(article);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Редактировать
                        </button>
                        <button
                          className={s.btnDelete}
                          onClick={() => {
                            setSelectedArticle(article);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      <UniversalModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetAdd();
        }}
        onApply={async () => {
          await triggerAdd(); 
        }}
        applyText="Сохранить"
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h5>Добавить статью</h5>
            <div className={modal_s.items}>
              <div className={modal_s.item}>
                <p>Заголовок</p>
                <input
                  type="text"
                  placeholder="Введите заголовок"
                  {...registerAdd("title", { required: "Обязательное поле" })}
                />
                {errorsAdd.title && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAdd.title.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Описание</p>
                <textarea
                  className={s.modal__textarea}
                  placeholder="Введите описание"
                  {...registerAdd("description")}
                />
                {errorsAdd.description && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAdd.description.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Ссылка на изображение</p>
                <input
                  type="text"
                  placeholder="https://..."
                  {...registerAdd("image", { required: "Обязательное поле" })}
                />
                {errorsAdd.image && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAdd.image.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Автор</p>
                <input
                  type="text"
                  placeholder="Введите имя автора"
                  {...registerAdd("author", { required: "Обязательное поле" })}
                />
                {errorsAdd.author && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAdd.author.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Статус</p>
                <select {...registerAdd("status", { required: "Обязательное поле" })}>
                  <option value="">Выберите статус</option>
                  <option value="опубликовано">Опубликовано</option>
                  <option value="черновик">Черновик</option>
                </select>
                {errorsAdd.status && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsAdd.status.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
      />

      <UniversalModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetEdit();
        }}
        onApply={async () => {
          await triggerEdit(); 
        }}
        applyText="Сохранить"
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h5>Редактировать статью</h5>
            <div className={modal_s.items}>
              <div className={modal_s.item}>
                <p>Заголовок</p>
                <input
                  type="text"
                  placeholder="Введите новый заголовок"
                  {...registerEdit("title", { required: "Обязательное поле" })}
                />
                {errorsEdit.title && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEdit.title.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Описание</p>
                <textarea
                  className={s.modal__textarea}
                  placeholder="Введите новое описание"
                  {...registerEdit("description", { required: "Обязательное поле" })}
                />
                {errorsEdit.description && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEdit.description.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Ссылка на изображение</p>
                <input
                  type="text"
                  placeholder="https://..."
                  {...registerEdit("image", { required: "Обязательное поле" })}
                />
                {errorsEdit.image && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEdit.image.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Автор</p>
                <input
                  type="text"
                  placeholder="Введите имя автора"
                  {...registerEdit("author", { required: "Обязательное поле" })}
                />
                {errorsEdit.author && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEdit.author.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={modal_s.item}>
                <p>Статус</p>
                <select {...registerEdit("status", { required: "Обязательное поле" })}>
                  <option value="">Выберите статус</option>
                  <option value="опубликовано">Опубликовано</option>
                  <option value="черновик">Черновик</option>
                </select>
                {errorsEdit.status && (
                  <div className={modal_s.message}>
                    <div>
                      <img src={warning} alt="Ошибка" />
                      <p>{errorsEdit.status.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
      />

      <UniversalModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onApply={() => {
          console.log("Удаление статьи — заглушка");
        }}
        applyText="Удалить"
        applyClassName={s.btnDelete}
        closeText="Закрыть"
        content={
          <section className={modal_s.common}>
            <h6>Подтвердите удаление</h6>
            <p>
              Вы действительно хотите удалить статью{" "}
              <strong>"{selectedArticle?.title}"</strong>?
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