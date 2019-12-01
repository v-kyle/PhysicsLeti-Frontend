Vue.component('question', {
    props: ['q_id'],
    data() {
        return {
            type: null,
            name: '',
            variants_of_answer: null,
            count_of_variants_of_answer: null,
            answer2type: null,
            hints: null,
            count_of_hints: null,
            score: null,
            showAlert: false,
        }
    },
    methods: {
        saveQuestion() {
            this.showAlert = true;
            setTimeout(()=>{
                this.showAlert = false;
            }, 4000);
            this.$emit('save-question', this.q_id, this.name, this.type, this.variants_of_answer, this.answer2type, this.hints, this.score);
        },

    },
    watch: {
        count_of_variants_of_answer(value) {
            this.variants_of_answer = [];
            for (let i = 0; i < value; i++) {
                this.variants_of_answer.push({id: i, variant: ""});
            }
        },
        count_of_hints(value) {
            this.hints = [];
            for (let i = 0; i < value; i++) {
                this.hints.push({id: i, str: ""});
            }
        },

    },

    template: ` <v-form>
                    <v-alert :value="showAlert" color="success">Вопрос добавлен в тест</v-alert>
                    <v-card raised style="padding: 10px;">
                        <h2>Вопрос №{{ q_id }}</h2>
                        
                        <v-radio-group v-model="type" :mandatory="true" label="Выберите тип вопроса:">
                            <v-radio label="Один ответ" value="0"></v-radio>
                            <v-radio label="Несколько ответов" value="1"></v-radio>
                            <v-radio label="Открытый вопрос" value="2"></v-radio>
                        </v-radio-group>
                        
                        <v-divider color="yellow"></v-divider>
                        <v-spacer></v-spacer>
                        
                        <v-text-field v-model="name" label="Введите вопрос"></v-text-field>
                                                
                        <v-divider color="yellow"></v-divider>
                        <v-spacer></v-spacer>
                        
                        <div v-if="type==0 || type==1">                 
                            <v-text-field type="number" label="Сколько вариантов ответа в вопросе?" v-model="count_of_variants_of_answer"></v-text-field>
                            <v-text-field v-for="answer in variants_of_answer" v-model="answer.variant" label="Введите вариант ответа" :key="answer.id"></v-text-field>
                        </div>
                        <div v-else>
                            <v-text-field v-model="answer2type" label="Введите ответ"></v-text-field>
                        </div>
                        
                        <v-divider color="yellow"></v-divider>
                        <v-spacer></v-spacer>  
                         
                         <div>      
                            <v-text-field type="number" label="Сколько подсказок в вопросе?" v-model="count_of_hints"></v-text-field>
                            <v-text-field v-for="hint in hints" v-model="hint.str" label="Введите подсказку" :key="hint.id"></v-text-field>
                         </div>  
                         
                        <v-divider color="yellow"></v-divider>
                        <v-spacer></v-spacer>
                        
                        <v-text-field v-model="score" label="Максимальный балл за ответ на вопрос"></v-text-field>
                        
                        <v-btn @click="saveQuestion" color="success">Добавить вопрос</v-btn>
                    </v-card>
                </v-form> `
});


let app = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data: {
        message: 'Test message',
        countOfQuestions: 0,
        testTitle: "",
        questions: [],
    },
    methods: {
        createQuestions() {
            this.questions = [];
            for (let i = 0; i < this.countOfQuestions; i++) {
                this.questions.push({
                    id: i,
                });
            }
        },
        saveQuestion(id, name, type, variants_of_answer, answer2type, hints, score) {
            this.questions[id - 1] = {
                name,
                type,
                variants_of_answer,
                answer2type,
                hints,
                score
            }
        }
    },


});
