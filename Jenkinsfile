pipeline {
    agent {
        // Sử dụng agent với label phù hợp (ví dụ: 'linux' hoặc để any)
        label 'ubuntu-latest || any'
    }

    // Mô phỏng 'strategy.matrix' từ GitHub Actions
    environment {
        // Định nghĩa các node version bạn muốn chạy matrix
        // Trong Jenkins, matrix thường được xử lý bằng 'parallel' stages
        NODE_VERSION = "20.x"
    }

    tools {
        // Sử dụng tool Node.js đã cấu hình trong Jenkins, tên phải khớp
        // Ví dụ: 'node20' nếu bạn cài Node.js 20.x
        nodejs 'node20' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup & Install') {
            steps {
                // Bước tương đương với 'actions/setup-node' và 'cache: npm'
                // Jenkins NodeJS tool đã tự setup node và npm rồi, nên không cần chạy lại
                // Cache dependencies: Jenkins có thể cấu hình cache riêng, nhưng 'npm ci' là đủ nhanh

                // Cài đặt dependencies
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Tương đương với 'npx playwright install' trong GitHub Actions
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            // Mô phỏng matrix strategy: chạy song song các version nếu cần
            // Ở đây mình chạy tuần tự 2 loại test, nhưng có thể bọc trong parallel nếu muốn
            stages {
                stage('Playwright Tests') {
                    steps {
                        // Tương đương với 'npm run test'
                        // 'continueOnError: true' để bắt chước 'continue-on-error: true'
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh 'npm test'
                        }
                    }
                    post {
                        always {
                            // Publish Playwright report dù pass hay fail
                            publishHTML(target: [
                                allowMissing: true,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'playwright-report',
                                reportFiles: 'index.html',
                                reportName: 'Playwright Report'
                            ])
                            archiveArtifacts(artifacts: 'playwright-report/**/*')
                        }
                    }
                }

                stage('Cucumber (BDD) Tests') {
                    steps {
                        // Tương đương với 'npm run bdd'
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh 'npm run bdd'
                        }
                    }
                    post {
                        always {
                            // Publish Cucumber report dù pass hay fail
                            publishHTML(target: [
                                allowMissing: true,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: '.',
                                reportFiles: 'cucumber-report.html',
                                reportName: 'Cucumber Report'
                            ])
                            archiveArtifacts(artifacts: 'cucumber-report.html')
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            // Dọn dẹp workspace
            cleanWs()
        }
    }
}