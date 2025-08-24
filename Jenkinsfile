pipeline {
    agent any
    tools {
        nodejs 'Node20' // Định nghĩa Node.js version (cần cấu hình Node.js trong Jenkins Global Tool Configuration)
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
                // Node.js đã được cấu hình ở tools, không cần thêm bước setup
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
                sh 'npm run test' // Chạy test
            }
            continueOnError: true // Tương ứng với continue-on-error: true
        }
        stage('Run BDD') {
            steps {
                sh 'npm run bdd' // Chạy BDD
            }
            continueOnError: true // Tương ứng với continue-on-error: true
        }
    }
    post {
        always {
            cleanWs() // Dọn dẹp workspace sau khi chạy
        }
    }
}