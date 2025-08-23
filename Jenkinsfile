pipeline {
    agent {
        docker {
            image 'node:20' // Su dung Node.js version 20.x
            args '-u root' // Chay voi quyen root de tranh van de quyen
        }
    }
    
    triggers {
        pollSCM('H/5 * * * *') // Kiem tra SCM moi 5 phut
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm // Tuong duong voi actions/checkout@v4
            }
        }
        
        stage('Setup Node.js') {
            steps {
                // Node.js da co san trong Docker image
                sh 'node --version'
                sh 'npm --version'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Cai dat dependencies
                sh 'npx playwright install' // Cai dat Playwright
            }
        }
        
        stage('Run Tests') {
            steps {
                // Chay test va khong that bai pipeline neu test loi
                script {
                    try {
                        sh 'npm run test'
                    } catch (Exception e) {
                        echo 'Tests failed, continuing pipeline...'
                    }
                }
            }
        }
        
        stage('Run BDD') {
            steps {
                script {
                    try {
                        sh 'npm run bdd'
                    } catch (Exception e) {
                        echo 'BDD failed, continuing pipeline...'
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs() 
        }
    }
}