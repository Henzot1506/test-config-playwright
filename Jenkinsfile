pipeline {
    agent any
    tools {
        nodejs 'Node20' // Đảm bảo plugin NodeJS đã cài và Node20 được cấu hình trong Global Tool Configuration
    }
    triggers {
        githubPush()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm 
            }
        }
        stage('Setup Node.js') {
            steps {
                sh 'npm ci' // Cài đặt dependencies
            }
        }
        stage('Install Playwright') {
            steps {
                sh 'npx playwright install' // Cài đặt Playwright
            }
        }
        stage('Run Tests') {
            steps {
                // Sử dụng returnStatus: true để bỏ qua lỗi, tương tự continue-on-error
                sh returnStatus: true, script: 'npm run test' // Chạy test
            }
        }
        stage('Run BDD') {
            steps {
                // Sử dụng returnStatus: true để bỏ qua lỗi, tương tự continue-on-error
                sh returnStatus: true, script: 'npm run bdd' // Chạy BDD
            }
        }
    }
    post {
        always {
            cleanWs() // Dọn dẹp workspace sau khi chạy
        }
    }
}