pipeline {
    agent {
        label 'ubuntu-latest' // Sử dụng agent có nhãn ubuntu-latest
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout mã nguồn từ repository
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                // Sử dụng plugin NodeJS để cài đặt Node.js phiên bản 20.x
                tool name: 'Node20', type: 'nodejs'
                sh 'npm install -g npm@latest' // Cập nhật npm
                sh 'node --version' // Kiểm tra phiên bản Node.js
                sh 'npm --version' // Kiểm tra phiên bản npm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Cài đặt dependencies với npm ci, sử dụng cache nếu có
                sh 'npm ci'
            }
        }
        
        stage('Install Playwright') {
            steps {
                // Cài đặt Playwright
                sh 'npx playwright install'
            }
        }
        
        stage('Run Tests') {
            steps {
                // Chạy npm run test, tiếp tục pipeline dù có lỗi
                script {
                    try {
                        sh 'npm run test'
                    } catch (Exception e) {
                        echo "Test step failed: ${e.getMessage()}. Continuing..."
                    }
                }
            }
        }
        
        stage('Run BDD Tests') {
            steps {
                // Chạy npm run bdd, tiếp tục pipeline dù có lỗi
                script {
                    try {
                        sh 'npm run bdd'
                    } catch (Exception e) {
                        echo "BDD Test step failed: ${e.getMessage()}. Continuing..."
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Lưu trữ artifacts hoặc log nếu cần
            archiveArtifacts artifacts: '*/test-results/*', allowEmptyArchive: true
        }
    }
}