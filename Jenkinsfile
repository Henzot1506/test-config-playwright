pipeline {
    agent any
    tools {
        nodejs 'Node20' // Đảm bảo Node20 đã được cấu hình trong Global Tool Configuration
    }
    triggers {
        githubPush() // Trigger pipeline khi có commit/push
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm // Tương ứng với actions/checkout@v4
            }
        }
        stage('Setup Node.js') {
            steps {
                bat 'npm ci' // Sử dụng bat thay vì sh trên Windows
            }
        }
        stage('Install Playwright') {
            steps {
                bat 'npx playwright install' // Sử dụng bat thay vì sh
            }
        }
        stage('Run Tests') {
            steps {
                bat returnStatus: true, script: 'npm run test' // Bỏ qua lỗi nếu test thất bại
            }
        }
        stage('Run BDD') {
            steps {
                bat returnStatus: true, script: 'npm run bdd' // Bỏ qua lỗi nếu BDD thất bại
            }
        }
    }
    post {
        always {
            cleanWs() 
        }
    }
}