import { auth, db } from '../firebase';
import { deleteDoc, collection, doc, addDoc, getDocs, where, query } from 'firebase/firestore';


const getLanguages = (setLanguages, setIsLoading) => {
    if (auth.currentUser) {
        let newlanguages = []
        try {
            const q = query(collection(db, "languages"), where("userId", "==", auth.currentUser.uid));
            getDocs(q)
                .then((result) => {
                    result.forEach((lang) => {
                        let language = lang.data();
                        language.id = lang.id;
                        newlanguages.push(language);
                    })
                    setLanguages(newlanguages)
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch(e) {
            console.log(e);
        }
    }
}

const addNewLanguage = (languages, setModalVisible, setNewLanguage, newLanguage) => {
    let exists = false;
    languages.forEach((lang) => {
        if (lang.language.toLowerCase() == newLanguage.toLowerCase().trim()) {
            exists = true;
            return;
        }
    })

    if (!exists) {
        const newData = {
            language: newLanguage.trim(),
            userId: auth.currentUser.uid
        }
        
        addDoc(collection(db, "languages"), newData)
            .then((result) => {
                getLanguages();
                setModalVisible(false);
                setNewLanguage("");
            })
            .catch((err) => {
                console.log(err);
            })
        }
}

const deleteLanguageAndData = (id) => {
    deleteDoc(doc(db, "languages", id))
        .then((res) => {
            deleteAllDataForALanguage(id)
        })
        .catch((err) => {
            console.log(err);
        })
}

const getTopicData = (languageId, setTopicData, setLoading) => {
    const q = query(collection(db, "topics"), where("languageId", "==", languageId));
    getDocs(q)
        .then((res) => {
            let tempData = []
            res.forEach((lang) => {
                let buitdLang = lang.data();
                buitdLang.id = lang.id;
                tempData.push(buitdLang)
            })
            setTopicData(tempData)
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
}

const addNewTopicToDB = (newTopic, setLoading, language) => {
    setLoading(true);
    addDoc(collection(db, "topics"), {
        topic: newTopic.head,
        description: newTopic.body,
        languageId: language.id,
        userId: auth.currentUser.uid
        })
        .catch((err) => {
            console.log(err);
        })
}

const deleteTopicAndData = (id) => {
    deleteDoc(doc(db, "topics", id))
        .then(() => {
            deleteAllDataForATopic(id);
        })
        .catch((err) => {
            console.log(err);
        })
}

const deleteAllDataForALanguage = (languageId) => {
    const q = query(collection(db, "topics"), where("languageId", "==", languageId));
    getDocs(q)
        .then((res) => {
            res.forEach((lang) => {
                deleteTopicAndData(lang.id);
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

const deleteAllDataForATopic = (topicId) => {
    const q = query(collection(db, "Q&As"), where("topicId", "==", topicId));
    getDocs(q)
        .then((res) => {
            res.forEach((lang) => {
                deleteQuizFromTopic(lang.id);
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

const getUpdatedQuizData = (filterInput, setQuizData, setLoading, topicId) => {
    const q = query(collection(db, "Q&As"),
                    where("topicId", "==", topicId));
    getDocs(q)
        .then((res) => {
            let updatedTopics = []
            res.forEach((data) => {
                let createTopic = data.data();
                createTopic.id = data.id;
                updatedTopics.push(createTopic);
            })
            setQuizData(updatedTopics);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
}

const addNewQuizToDB = (newQuiz, topic) => {
    const addTopic = {
        question : newQuiz.head,
        answer : newQuiz.body,
        topicId : topic.id,
        languageId: topic.languageId,
        userId: auth.currentUser.uid
    }

    addDoc(collection(db, "Q&As"), addTopic)
        .catch((err) => {
            console.log(err);
        })
}

const deleteQuizFromTopic = (quizId) => {
    deleteDoc(doc(db, "Q&As", quizId))
        .catch((err) => {
            console.log(err);
        })
}

export {
    addNewLanguage,
    deleteLanguageAndData,
    getLanguages,
    addNewTopicToDB,
    deleteTopicAndData,
    getTopicData,
    getUpdatedQuizData,
    addNewQuizToDB,
    deleteQuizFromTopic
}