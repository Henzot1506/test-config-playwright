pipeline {
    agent {
        label 'ubuntu-latest || any'
    }

    environment {
        // Có thể định nghĩa version ở đây để dễ thay đổi
        NODE_VERSION = "20.x"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                // Script này cài đặt nvm (Node Version Manager) và sau đó cài đặt phiên bản Node.js cụ thể
                sh '''
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\\\. "$NVM_DIR/nvm.sh"  # This loads nvm
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    node --version
                    npm --version
                '''
            }
        }

        stage('Setup & Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Playwright Tests') {
                    steps {
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh 'npm test'
                        }
                    }
                    post {
                        always {
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
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh 'npm run bdd'
                        }
                    }
                    post {
                        always {
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
            cleanWs()
        }
    }
}